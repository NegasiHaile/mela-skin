"use client";

import { useEffect, useRef, useState } from "react";
import { FRAG, VERT } from "./serumShader";

/*
  The canvas that runs the bottle, and everything around it that keeps a
  per-pixel renderer from being a liability on a clinic's home page.

  THE CANVAS IS TRANSPARENT. `alpha: true` with straight (not premultiplied)
  alpha, cleared to zero every frame: the shader draws the bottle and its shadow
  and leaves the rest untouched, so the site's own brand pattern is what sits
  behind it. That is also why the fallback is a non-event — without WebGL you get
  the same page with no bottle on it, rather than a hole where a background was.

  IT IS ALLOWED TO FAIL. WebGL2 can be missing, blocked, or lost when a laptop
  switches GPUs. Every one of those paths ends the same way: this renders
  nothing, and the hero underneath carries on.

  IT IS NOT ALLOWED TO RUN WHEN NOBODY IS LOOKING. Refraction is three marches a
  pixel, which is real power on a laptop. The loop stops when the section leaves
  the viewport and when the tab is hidden, and it never starts under
  `prefers-reduced-motion` — that gets one still frame, so the bottle is there,
  it just does not turn.

  RESOLUTION IS DELIBERATELY NOT DEVICE PIXELS. There is no text and no hairline
  in the render, and glass is soft by nature. 0.8 of a ratio capped at 1.5 is
  indistinguishable from native at roughly a third of the fragment work.

  COLOUR COMES FROM THE PAGE, read off the document's own custom properties, so
  the render cannot drift from globals.css.
*/
/** Falls back to the committed hexes if a property is missing at read time. */
const PALETTE: [string, string][] = [
  ["--color-ms-field", "#2c190b"],
  ["--color-ms-terracotta", "#99571d"],
  ["--color-ms-gold", "#dcbc63"],
  ["--color-ms-cream", "#f4e7d6"],
  /* The serum. Caramel is the palette's own amber and needs no new token. */
  ["--color-ms-caramel", "#d1a76d"],
];

function readRgb(name: string, fallback: string): [number, number, number] {
  const raw =
    typeof window === "undefined"
      ? ""
      : getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const hex = (/^#[0-9a-f]{6}$/i.test(raw) ? raw : fallback).slice(1);
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ];
}

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function SerumScene() {
  const ref = useRef<HTMLCanvasElement>(null);
  /** Drives the fade-in, so a failed context never leaves a black rectangle. */
  const [live, setLive] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      /* Straight alpha: the shader writes coverage, not colour times coverage. */
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      /* A paused loop has to leave its last frame up rather than a blank. */
      preserveDrawingBuffer: true,
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = vs && fs ? gl.createProgram() : null;
    if (!vs || !fs || !program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    /* WebGL2 needs a bound VAO even to draw from nothing but the vertex index. */
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const u = {
      res: gl.getUniformLocation(program, "uRes"),
      time: gl.getUniformLocation(program, "uTime"),
      pointer: gl.getUniformLocation(program, "uPointer"),
      field: gl.getUniformLocation(program, "uField"),
      terracotta: gl.getUniformLocation(program, "uTerracotta"),
      gold: gl.getUniformLocation(program, "uGold"),
      cream: gl.getUniformLocation(program, "uCream"),
      amber: gl.getUniformLocation(program, "uAmber"),
      frame: gl.getUniformLocation(program, "uFrame"),
    };
    const [field, terracotta, gold, cream, amber] = PALETTE.map(([name, fall]) =>
      readRgb(name, fall),
    );
    gl.uniform3fv(u.field, field);
    gl.uniform3fv(u.terracotta, terracotta);
    gl.uniform3fv(u.gold, gold);
    gl.uniform3fv(u.cream, cream);
    gl.uniform3fv(u.amber, amber);
    gl.clearColor(0, 0, 0, 0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* -- sizing ----------------------------------------------------------- */
    let width = 0;
    let height = 0;
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.8;
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (w === width && h === height) return false;
      width = w;
      height = h;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(u.res, w, h);
      /*
        Two compositions from one scene. Wide: the bottle stands right of centre
        beside the copy, at full size. Narrow: it moves up and back, so the copy
        sits under it rather than across it, and the whole bottle is above the
        headline instead of behind it.
      */
      if (w / h > 1.15) gl.uniform3f(u.frame, 0.46, 0.0, 1.0);
      else gl.uniform3f(u.frame, 0.0, 0.36, 1.72);
      return true;
    };

    /* -- pointer ---------------------------------------------------------- */
    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const onPointer = (event: PointerEvent) => {
      /* Fine pointers only. A touch drag turning the camera fights the scroll. */
      if (event.pointerType !== "mouse") return;
      target.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    /* -- the loop --------------------------------------------------------- */
    let frame = 0;
    let running = false;
    let clock = 0;
    let last = 0;

    const draw = (time: number) => {
      /*
        Time is accumulated rather than read, so a loop that stopped while the
        tab was hidden resumes where it paused instead of jumping forward by the
        length of the interruption. Wrapped at 600s: the lattice repeats in z, so
        the wrap cannot be seen, and every number stays small enough to be exact.
      */
      const dt = last ? Math.min((time - last) / 1000, 0.05) : 0;
      last = time;
      clock = (clock + dt) % 600;

      eased.x += (target.x - eased.x) * 0.045;
      eased.y += (target.y - eased.y) * 0.045;

      resize();
      gl.uniform1f(u.time, clock);
      gl.uniform2f(u.pointer, eased.x, eased.y);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = running ? requestAnimationFrame(draw) : 0;
    };

    const stop = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    };
    const play = () => {
      if (running || reduced.matches) return;
      running = true;
      frame = requestAnimationFrame(draw);
    };

    /* One frame first, so there is a picture before anything is decided. */
    resize();
    gl.uniform1f(u.time, 0);
    gl.uniform2f(u.pointer, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    setLive(true);

    let onScreen = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) play();
        else stop();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) play();
    };
    const onReduced = () => {
      if (reduced.matches) stop();
      else if (onScreen && !document.hidden) play();
    };
    /*
      A lost context is not an error worth reporting to a visitor: the fade below
      takes the canvas away and the brand ground behind it carries the hero.
    */
    const onLost = (event: Event) => {
      event.preventDefault();
      stop();
      setLive(false);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (resize() && !running) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
    });
    resizeObserver.observe(canvas);

    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onReduced);
    canvas.addEventListener("webglcontextlost", onLost);
    play();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onReduced);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteProgram(program);
      gl.deleteVertexArray(vao);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      /*
        Decorative, and it says so: no role, no label, and the hero's meaning is
        entirely in the type above it. The fade is what makes a missing context a
        non-event rather than a black hole.
      */
      className={`pointer-events-none absolute inset-0 size-full transition-opacity duration-1000 ${
        live ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
