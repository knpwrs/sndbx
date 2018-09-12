const fastify = require('fastify')({
  logger: !!process.env.LOG,
});

fastify.get('/', (req, res) => {
  res.send({ hello: 'world' });
});

// fastify.listen(3000, '0.0.0.0', (err, addr) => {
fastify.listen(3000, (err, addr) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${addr}`);
});
