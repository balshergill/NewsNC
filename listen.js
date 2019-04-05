const app = require("./app");

const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

/*
clone
ENV
NODE_ENV = production
PORT = randomNum
custom ENV's
npm install
npm start
*/
