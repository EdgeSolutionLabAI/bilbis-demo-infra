export default {
  fetch(_request: Request): Response {
    return new Response("Hello from Bilbis", {
      headers: { "Content-Type": "text/plain" },
    });
  },
};
