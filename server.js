const express = require("express");
const next = require("next");
const cors = require("cors");
const domains = require("./public/domains.json");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// https://stackoverflow.com/a/42761393/5677040
function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

app.prepare().then(() => {
  const server = express();
  server.use(cors());

  server.use("/static", express.static("public"));

  server.get("/domains", (req, res) => {
    return res.json(
      req.query.limit && req.query.page
        ? paginate(domains, req.query.limit, req.query.page)
        : domains
    );
  });

  server.get("/", (req, res) => {
    return app.render(req, res, "/index", req.query);
  });

  server.get("/whois", (req, res) => {
    return app.render(req, res, "/whois", req.query);
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
