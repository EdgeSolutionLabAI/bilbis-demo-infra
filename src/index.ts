export default {
  fetch(_request: Request, _env: unknown, _ctx: ExecutionContext): Response {
    return new Response("Hello from Bilbis", {
      headers: { "Content-Type": "text/plain" },
    });
  },
} satisfies ExportedHandler;
