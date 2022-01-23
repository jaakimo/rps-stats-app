const http = require('http');
const request = require('request');

const URI = 'https://bad-api-assignment.reaktor.com';

http
  .createServer((req, res) => {
    req
      .pipe(
        request(`${URI}${req.url}`, {}, (err) => {
          req.pipe(res);
        }),
      )
      .pipe(res);
  })
  .listen(3001);
