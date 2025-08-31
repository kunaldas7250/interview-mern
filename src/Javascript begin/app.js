const express = require("express");
const cluster = require("node:cluster");
const os = require("os");
const http = require('node:http');
const totalcpu = os.cpus().length;
console.log("Total CPUs:", totalcpu);

// if (cluster.isPrimary) {
//   const worker = cluster.fork();
//   worker.on('exit', (code, signal) => {
//     if (signal) {
//       console.log(`worker was killed by signal: ${signal}`);
//     } else if (code !== 0) {
//       console.log(`worker exited with error code: ${code}`);
//     } else {
//       console.log('worker success!');
//     }
//   });
// }
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalcpu; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
//   const app = express();

//   // use JSON middleware
//   app.use(express.json());
//   app.get("/", (req, res) => {
//     res.send("Server is running ✅");
//     app.listen(4000, () => {
//       console.log("🚀 Your server is running on port 4000");
//     });
//   });
http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
