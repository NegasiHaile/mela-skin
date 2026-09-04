/*
  ONE OPTION, AND IT EXISTS SO A VERIFICATION BUILD CANNOT DISTURB `next dev`.

  `next dev` and `next build` both default to writing `.next`, and they do not
  share it peaceably: a production build rewrites BUILD_ID, build-manifest.json,
  `server/` and `static/` underneath a dev server that is still holding its own
  chunk hashes, and the dev server then serves 404s for chunks or throws
  "Cannot find module" until it is restarted.

  The default below is `.next`, so nothing changes for anybody running the app
  normally. Setting MS_DIST_DIR sends a build somewhere else instead:

      MS_DIST_DIR=.next-verify npx next build

  which is what an agent or a CI step should use while a dev server is up on
  3000. Read the rendered HTML out of `<that dir>/server/app/*.html`.
*/
const nextConfig = {
  distDir: process.env.MS_DIST_DIR || ".next",
};

export default nextConfig;
