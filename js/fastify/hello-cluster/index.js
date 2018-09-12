const cluster = require('cluster');

if (cluster.isMaster) {
  const numCpus = require('os').cpus().length;

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died (code ${code}, signal ${signal})`);
  });
} else {
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
}
