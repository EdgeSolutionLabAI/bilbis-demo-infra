interface Env {
  CACHE: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/count") {
      const counterKey = "counter";
      const currentValue = await env.CACHE.get(counterKey);
      const count = currentValue ? parseInt(currentValue, 10) : 0;
      const newCount = count + 1;

      await env.CACHE.put(counterKey, newCount.toString());

      return new Response(newCount.toString(), {
        headers: { "Content-Type": "text/plain" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
} satisfies ExportedHandler;
