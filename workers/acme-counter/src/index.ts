interface Env {
  CACHE: KVNamespace;
}

const COUNTER_KEY = "call-count";

export default {
  async fetch(_request: Request, env: Env): Promise<Response> {
    const current = Number((await env.CACHE.get(COUNTER_KEY)) ?? "0");
    const next = current + 1;
    await env.CACHE.put(COUNTER_KEY, String(next));

    return new Response(String(next), {
      headers: { "Content-Type": "text/plain" },
    });
  },
} satisfies ExportedHandler<Env>;
