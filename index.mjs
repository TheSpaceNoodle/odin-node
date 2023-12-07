import http from "http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const port = process.env.PORT || 3000;
const host = process.env.HOST || "host";
const basePath = path.dirname(fileURLToPath(import.meta.url));

const PAGES = {
  "/": "index.html",
  "/about": "about.html",
  "/contact": "contact-me.html",
};

const server = http.createServer((req, res) => {
  const { url } = req;

  fs.readFile(path.join(basePath, PAGES[url] || "404.html"), (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "plain/text" });
      return res.end(err.message);
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
  });
});

server.listen(process.env.PORT || 3000, process.env.HOST, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
