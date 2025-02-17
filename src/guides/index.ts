
export default {
    async fetch(request, env) {
      const stmt = env.DB.prepare("SELECT * FROM guides");
      const { results } = await stmt.all();
  
      return new Response(JSON.stringify(results), {
        headers: {
          "content-type": "text/html",
        },
      });
    },
  } satisfies ExportedHandler<Env>;