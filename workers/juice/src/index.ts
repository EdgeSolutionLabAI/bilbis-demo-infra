interface Env {
  JUICE_KV: KVNamespace;
}

const DEFAULT_JUICES = ["orange juice", "apple juice", "mango juice", "grape juice", "pineapple juice"];

export default {
  async fetch(_request: Request, env: Env): Promise<Response> {
    // Get all keys from KV
    const list = await env.JUICE_KV.list();
    const keys = list.keys.map(k => k.name);

    // Use KV keys if available, otherwise fall back to default list
    const juiceList = keys.length > 0 ? keys : DEFAULT_JUICES;
    const randomJuice = juiceList[Math.floor(Math.random() * juiceList.length)];

    // If we're using KV, fetch the value; otherwise use the juice name directly
    let result = randomJuice;
    if (keys.length > 0) {
      const value = await env.JUICE_KV.get(randomJuice);
      result = value ?? randomJuice;
    }

    return new Response(result, {
      headers: { "Content-Type": "text/plain" },
    });
  },
} satisfies ExportedHandler<Env>;
