/*
  A SERUM BOTTLE, MODELLED AND LIT IN THE BROWSER.

  WHAT THIS REPLACED, AND WHY. The first attempt at a 3D hero was an abstract
  lattice of the brand's sparkle. It was three-dimensional by construction and
  not by appearance: brown shapes on a brown ground, in the same layout as hero
  A, so it read as "the first hero with the photograph removed". Correctly
  rejected. Abstraction is not a subject.

  This has a subject: the thing on the clinic's shelf. A glass dropper bottle,
  amber serum inside it to the fill line, a gold collar and cap, standing on its
  own shadow and turning slowly. It is the object a skincare consultation ends
  with, and it is the one hero of the four that is about a treatment rather than
  about a mood.

  IT IS REAL GEOMETRY, NOT A PICTURE OF GEOMETRY. Every surface here is a signed
  distance function solved per pixel, per frame: the body is a rounded cylinder,
  the shoulder is a smooth blend into the neck, the cap is a tapered cylinder
  with a rubber teat on top, and the serum is the body shrunk by the wall
  thickness and cut by a plane. Turn the bottle and the highlights move over the
  glass because the light is being computed, not painted.

  THE GLASS IS ACTUALLY REFRACTING. A ray that meets the bottle is split: part
  reflects off the surface, part bends into the glass, crosses the interior,
  bends again on the way out and samples the environment from a different
  direction. That is why the serum line bows, why the far wall shows through
  displaced, and why the bottle reads as full rather than as a brown shape. It is
  three marches per pixel instead of one, which is the whole cost of the effect.

  THE CANVAS IS TRANSPARENT. Only the bottle and its shadow are drawn; everything
  else is left at zero alpha so the site's own brand pattern shows through
  behind. The 3D object sits ON the page rather than replacing its background,
  which is also what keeps the fallback honest: with no WebGL you get the same
  page, minus the bottle.

  COLOUR COMES FROM THE PAGE. Every colour arrives as a uniform read from the
  document's CSS custom properties, so the render cannot drift from globals.css.
*/

export const VERT = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

export const FRAG = `#version 300 es
precision highp float;

out vec4 outColor;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uPointer;
/*
  Where the bottle is framed: xy shifts it, z zooms out. Two very different
  compositions from one scene — beside the copy on a desktop, above it and
  smaller on a phone, where there is no left half to stand out of.
*/
uniform vec3  uFrame;
uniform vec3  uField;
uniform vec3  uTerracotta;
uniform vec3  uGold;
uniform vec3  uCream;
uniform vec3  uAmber;

const float FLOOR_Y = -0.72;
const float FILL_Y = 0.06;
/** Borosilicate is about 1.47. The reciprocal is the ray going in. */
const float IOR = 1.47;

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float sdCyl(vec3 p, float h, float r) {
  vec2 d = abs(vec2(length(p.xz), p.y)) - vec2(r, h);
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

float sdEllipsoid(vec3 p, vec3 r) {
  float k0 = length(p / r);
  float k1 = length(p / (r * r));
  return k0 * (k0 - 1.0) / k1;
}

/*
  The glass shell, as one solid. Rounded on every edge, because a bottle with a
  mathematically sharp rim is the giveaway that nobody modelled it.
*/
float sdGlass(vec3 p) {
  float body = sdCyl(p, 0.40, 0.245) - 0.035;
  float neck = sdCyl(p - vec3(0.0, 0.53, 0.0), 0.11, 0.082) - 0.012;
  /* The shoulder is the blend, not a separate part. */
  return smin(body, neck, 0.13);
}

/** The serum: the body, shrunk by the wall, and cut off at the fill line. */
float sdSerum(vec3 p) {
  float inner = sdCyl(p, 0.375, 0.212) - 0.03;
  return max(inner, p.y - FILL_Y);
}

/** Collar, cap and teat, in one metal. */
float sdMetal(vec3 p) {
  float collar = sdCyl(p - vec3(0.0, 0.635, 0.0), 0.022, 0.105) - 0.008;
  float cap = sdCyl(p - vec3(0.0, 0.745, 0.0), 0.085, 0.095) - 0.012;
  float teat = sdEllipsoid(p - vec3(0.0, 0.885, 0.0), vec3(0.072, 0.085, 0.072));
  return min(min(collar, cap), smin(cap, teat, 0.04));
}

/* -- the scene the camera sees ------------------------------------------- */

/** x is distance, y is the material: 1 glass, 2 metal. */
vec2 mapSolid(vec3 p) {
  float g = sdGlass(p);
  float m = sdMetal(p);
  return g < m ? vec2(g, 1.0) : vec2(m, 2.0);
}

vec3 normalSolid(vec3 p) {
  vec2 e = vec2(0.0012, 0.0);
  return normalize(vec3(
    mapSolid(p + e.xyy).x - mapSolid(p - e.xyy).x,
    mapSolid(p + e.yxy).x - mapSolid(p - e.yxy).x,
    mapSolid(p + e.yyx).x - mapSolid(p - e.yyx).x
  ));
}

vec3 normalGlass(vec3 p) {
  vec2 e = vec2(0.0012, 0.0);
  return normalize(vec3(
    sdGlass(p + e.xyy) - sdGlass(p - e.xyy),
    sdGlass(p + e.yxy) - sdGlass(p - e.yxy),
    sdGlass(p + e.yyx) - sdGlass(p - e.yyx)
  ));
}

/*
  The room, as a function of direction rather than as a texture. A clinic-lit
  product shot is one big soft key from high and left, a weaker cream fill from
  the right, and a dark floor: three terms, and glass only ever shows you a
  blurred version of them anyway.
*/
vec3 env(vec3 d) {
  vec3 sky = mix(uField * 0.9, uField * 4.2, clamp(d.y * 0.5 + 0.55, 0.0, 1.0));
  float key = pow(max(dot(d, normalize(vec3(-0.45, 0.72, -0.52))), 0.0), 16.0);
  float fill = pow(max(dot(d, normalize(vec3(0.85, 0.12, 0.35))), 0.0), 5.0);
  sky += uCream * key * 4.2;
  sky += uGold * key * 2.2;
  sky += uTerracotta * fill * 1.15;
  return sky;
}

/** Metal: no diffuse, a blurred environment and a hard highlight. */
vec3 shadeMetal(vec3 n, vec3 v) {
  vec3 r = reflect(-v, n);
  vec3 base = env(r) * 0.55 + uGold * 0.55;
  float key = pow(max(dot(r, normalize(vec3(-0.45, 0.72, -0.52))), 0.0), 60.0);
  float fre = pow(1.0 - max(dot(n, v), 0.0), 4.0);
  return base * uGold * 1.5 + uCream * key * 1.1 + uGold * fre * 0.5;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
  uv = (uv - uFrame.xy) * uFrame.z;

  /*
    A long lens from slightly above. Product photography is shot long because a
    wide lens bows the sides of a bottle, and a bowed bottle looks like a render.
  */
  vec3 ro = vec3(0.0, 0.16, -4.6);
  vec3 rd = normalize(vec3(uv, 3.5));
  ro.yz *= rot(0.10 + uPointer.y * 0.05);
  rd.yz *= rot(0.10 + uPointer.y * 0.05);

  /* The bottle turns; the camera does not. Only the object should move. */
  float spin = uTime * 0.22 + uPointer.x * 0.30;
  mat2 turn = rot(spin);
  vec3 roL = ro;
  vec3 rdL = rd;
  roL.xz *= turn;
  rdL.xz *= turn;

  vec3 col = vec3(0.0);
  float alpha = 0.0;

  /* -- the shadow, drawn first so the bottle lands on top of it ----------- */
  if (rdL.y < 0.0) {
    float td = (FLOOR_Y - roL.y) / rdL.y;
    if (td > 0.0) {
      vec3 fp = roL + rdL * td;
      float r = length(fp.xz * vec2(1.0, 1.35));
      /* Soft, wide and shifted with the key light rather than centred. */
      float s = smoothstep(0.62, 0.06, length((fp.xz - vec2(0.10, -0.06)) * vec2(1.0, 1.4)));
      col = uField * 0.25;
      alpha = s * 0.72;
      /* A tighter core where the base meets the surface. */
      alpha += smoothstep(0.32, 0.0, r) * 0.24;
      alpha = clamp(alpha, 0.0, 0.92);
    }
  }

  /* -- the bottle --------------------------------------------------------- */
  float t = 0.0;
  float mat = 0.0;
  vec3 pos = roL;
  for (int i = 0; i < 96; i++) {
    pos = roL + rdL * t;
    vec2 h = mapSolid(pos);
    if (h.x < 0.0009) {
      mat = h.y;
      break;
    }
    t += h.x * 0.85;
    if (t > 8.0) break;
  }

  if (mat > 0.5) {
    vec3 v = -rdL;
    alpha = 1.0;

    if (mat > 1.5) {
      col = shadeMetal(normalSolid(pos), v);
    } else {
      vec3 n = normalGlass(pos);
      float fre = 0.04 + 0.96 * pow(1.0 - max(dot(n, v), 0.0), 5.0);

      /* Out: what the surface mirrors. */
      vec3 refl = env(reflect(rdL, n));

      /* In: bend, cross the interior, bend again on the way out. */
      vec3 rd2 = refract(rdL, n, 1.0 / IOR);
      vec3 p2 = pos + rd2 * 0.01;

      float ti = 0.0;
      float serumPath = 0.0;
      for (int i = 0; i < 56; i++) {
        vec3 q = p2 + rd2 * ti;
        float inside = -sdGlass(q);
        if (inside < 0.0008) break;
        /* Sample what the interior contains as the ray crosses it. */
        if (sdSerum(q) < 0.0) serumPath += inside;
        ti += max(inside, 0.004) * 0.85;
        if (ti > 3.0) break;
      }
      vec3 exitP = p2 + rd2 * ti;
      vec3 n2 = normalGlass(exitP);
      vec3 rd3 = refract(rd2, -n2, IOR);
      /* Total internal reflection at a grazing exit: mirror instead. */
      if (dot(rd3, rd3) < 0.001) rd3 = reflect(rd2, -n2);

      vec3 refr = env(rd3) * 1.25;

      /*
        Beer-Lambert through the serum: the further the ray travelled below the
        fill line, the more of the blue and green it lost. This is what makes the
        bottom of the bottle read as liquid and the top as air.
      */
      vec3 absorb = exp(-serumPath * (1.0 - uAmber) * 3.4);
      refr *= mix(vec3(1.0), absorb * uAmber * 3.6, clamp(serumPath * 6.0, 0.0, 1.0));

      col = mix(refr, refl, fre);

      /* The two things that make glass look like glass at a glance. */
      vec3 hv = normalize(normalize(vec3(-0.45, 0.72, -0.52)) + v);
      col += uCream * pow(max(dot(n, hv), 0.0), 90.0) * 2.4;
      col += uGold * pow(1.0 - max(dot(n, v), 0.0), 2.4) * 0.85;
    }
  }

  /* Dither, so the soft shadow does not band on an 8-bit surface. */
  float d = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (d - 0.5) / 255.0;

  outColor = vec4(clamp(col, 0.0, 1.6), clamp(alpha, 0.0, 1.0));
}`;
