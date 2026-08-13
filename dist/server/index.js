/**
 * Private Sites entry point.  The only published static assets are copied from
 * preview-site into dist/client during preview packaging.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isClientRoute = url.pathname === "/" || !url.pathname.split("/").pop().includes(".");

    if (isClientRoute) {
      return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
    }

    return env.ASSETS.fetch(request);
  },
};
