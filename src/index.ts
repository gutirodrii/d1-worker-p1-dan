
export default {
  async fetch(request, env) {
    return new Response(JSON.stringify(' '), {
      headers: {
        "content-type": "text/html",
      },
    });
  },
} satisfies ExportedHandler<Env>;