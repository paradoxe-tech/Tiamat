import { Map } from "./scenes/Map.js";
import { get } from "../interface/get.js";

const config = JSON.parse(get('/config'))
const urlParams = new URLSearchParams(window.location.search);

const args = {
  width: config.main.width,
  height: config.main.height,
  type: Phaser.WEBGL ,
  resolution: config.main.resolution,
  canvas: document.querySelector('#game-wrapper'),
  fps: 60,
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: config.main.gravity },
      debug: urlParams.has("debug") || config.settings.debug
    }
  },
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true
  },
  scene: [
    new Map(config),
  ]
}

const game = new Phaser.Game(args)