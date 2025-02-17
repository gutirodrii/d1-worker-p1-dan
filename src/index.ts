import { Router } from 'itty-router';

const router = Router();

// -------------------- GUIDES --------------------

router.get('/guides', async (request, env) => {
  const { results } = await env.DB.prepare('SELECT * FROM guides').all(); // Reemplaza con tu tabla
  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'text/html' },
  });
});

// -------------------- USERS --------------------

router.get('/users', async (request, env) => {
  const { results } = await env.DB.prepare('SELECT * FROM guides').all(); // Reemplaza con tu tabla
  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'text/html' },
  });
});

router.get('/users/:id', async (request, env) => {
  const { id } = request.params;
  const { results } = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(id).first(); // Reemplaza con tu tabla
  if (results) {
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'text/html' },
    });
  } else {
    return new Response('Not Found', { status: 404 });
  }
});

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

export default {
  fetch: router.handle,
};
