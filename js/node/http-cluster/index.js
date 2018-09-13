const http = require('http');
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
} else {
  const server = http.createServer((req, res) => {
    res.end('Hello, World!');
  });

  server.listen(3000);
}
