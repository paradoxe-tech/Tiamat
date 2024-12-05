import express from "express";
import fs from "fs";
const app = express();

app.use("/", express.static('client'))
app.use("/assets", express.static('assets'))

app.get('/config', (req, res) => {
  const configPath = 'config.json';
  const config = JSON.parse(fs.readFileSync(configPath));
  res.json(config);
})

app.listen(8080)