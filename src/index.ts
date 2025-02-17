import { Router } from 'itty-router';

const router = Router();

// -------------------- GUIDES --------------------

router.get('/guides', async (request, env) => {
  try {
    const { results } = await env.DB.prepare('SELECT * FROM guides').all();
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching guides:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
});

// -------------------- USERS --------------------

router.get('/users', async (request, env) => {
  try {
    const { results } = await env.DB.prepare('SELECT * FROM users').all();
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
});

router.get('/users/:id', async (request, env) => {
  const { id } = request.params;
  try {
    const { results } = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(id).first();
    if (results) {
      return new Response(JSON.stringify(results), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response('Not Found', { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
});

export default {
  async fetch(request, env) {
    try {
      return await router.handle(request, env);
    } catch (error) {
      console.error('Error handling request:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;

// Ruta para crear un nuevo registro
// router.post('/records', async (request, env) => {
//   const { name, value } = await request.json(); // Reemplaza con tus campos
//   const { results } = await env.DB.prepare('INSERT INTO your_table (name, value) VALUES (?, ?) RETURNING *').bind(name, value).first(); // Reemplaza con tu tabla y campos
//   return new Response(JSON.stringify(results), {
//     headers: { 'Content-Type': 'application/json' },
//     status: 201,
//   });
// });

// Ruta para actualizar un registro
// router.put('/records/:id', async (request, env) => {
//   const { id } = request.params;
//   const { name, value } = await request.json(); // Reemplaza con tus campos
//   const { results } = await env.DB.prepare('UPDATE your_table SET name = ?, value = ? WHERE id = ? RETURNING *').bind(name, value, id).first(); // Reemplaza con tu tabla y campos
//   if (results) {
//     return new Response(JSON.stringify(results), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } else {
//     return new Response('Not Found', { status: 404 });
//   }
// });

// Ruta para eliminar un registro
// router.delete('/records/:id', async (request, env) => {
//   const { id } = request.params;
//   const { results } = await env.DB.prepare('DELETE FROM your_table WHERE id = ?').bind(id).run(); // Reemplaza con tu tabla
//   if (results) {
//     return new Response(null, { status: 204 });
//   } else {
//     return new Response('Not Found', { status: 404 });
//   }
// });