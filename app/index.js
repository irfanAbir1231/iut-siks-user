
import next from 'next';
import http from 'http';

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer((req, res) => {
    handle(req, res);
  }).listen(iutsiks.iutoic-dhaka.edu, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});