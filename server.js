const http = require('http');
const express = require('express');
const app = express();
let index = 0;
app.get("/", (request, response) => {
//  console.log(`Received Ping || Number: ${++index}`)
  response.sendStatus(200);                            /// example how to keep your bot 24/7
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 20000);
require('./index.js')