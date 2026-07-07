interface Env {
  STORAGE: R2Bucket;
}

export default {
  async fetch(_request: Request, env: Env): Promise<Response> {
    try {
      const testKey = "test-object";
      const testContent = new TextEncoder().encode("Hello from acme-storage");

      // Write a test object to R2
      await env.STORAGE.put(testKey, testContent);

      // Read it back to confirm access
      const retrieved = await env.STORAGE.get(testKey);

      if (!retrieved) {
        return new Response("Error: Failed to retrieve test object", { status: 500 });
      }

      const content = await retrieved.text();
      return new Response(
        JSON.stringify({
          message: "Storage is accessible",
          bucket: "acme-storage",
          testObject: testKey,
          content: content,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: error instanceof Error ? error.message : "Unknown error",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
} satisfies ExportedHandler<Env>;
