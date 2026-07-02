export default {
  fetch(): Response {
    return new Response("Hello from Bilbis", {
      headers: { "Content-Type": "text/plain" },
    });
  },
} satisfies ExportedHandler;
