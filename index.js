import express from "express";
import fs from "fs";
import sizeOf from 'image-size';

const app = express();

app.use("/", express.static('client'))
app.use("/assets", express.static('assets'))

app.get('/config', (req, res) => {
  const configPath = 'config.json';
  const config = JSON.parse(fs.readFileSync(configPath));
  res.json(config);
})

app.get('/sprites', (req, res) => {
  let result = []
  for(let fileName of fs.readdirSync('./assets/sprites')) {

    const regex = /^([\w-]+)(_(\d+)_(\d+))(\.\w+)?$/;
    let match = fileName.match(regex);
    if(!match) match = [0, 1, 1, 1, 1]

    const dimensions = sizeOf(`./assets/sprites/${fileName}`)

    result.push({
      fileName: fileName.split('.')[0],
      width: dimensions.width,
      height: dimensions.height,
      rows: match[2] ? parseInt(match[3]) : 1,
      cols: match[3] ? parseInt(match[4]) : 1
    })
  }

  res.json(result)
})

app.listen(8080)