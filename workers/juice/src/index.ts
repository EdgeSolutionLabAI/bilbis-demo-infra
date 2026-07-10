interface Env {
  JUICE_KV: KVNamespace;
}

const DEFAULT_JUICES = ["orange juice", "apple juice", "mango juice", "grape juice", "pineapple juice"];

export default {
  async fetch(_request: Request, env: Env): Promise<Response> {
    const list = await env.JUICE_KV.list();
    const flavors = list.keys.map(k => k.name);

    // Fall back to the seed list when the KV namespace has not been populated yet.
    const juiceList = flavors.length > 0 ? flavors : DEFAULT_JUICES;
    const randomJuice = juiceList[Math.floor(Math.random() * juiceList.length)];

    return new Response(randomJuice, {
      headers: { "Content-Type": "text/plain" },
    });
  },
} satisfies ExportedHandler<Env>;
