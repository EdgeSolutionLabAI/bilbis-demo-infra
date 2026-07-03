export default {
  async fetch(_request: Request): Promise<Response> {
    return new Response("Hello from Bilbis", {
      headers: { "Content-Type": "text/plain" },
    });
  },
} satisfies ExportedHandler;
