import chroma from 'chroma-js';
import { SeedColor } from '~/data/seedColors';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export interface Palette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: {
    [s: string]: {
      id: string;
      name: string;
      hex: string;
      rgb: string;
      rgba: string;
    }[];
  };
}

function getRange(hexColor: string) {
  const end = '#fff';
  return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
}

function getScale(hexColor: string, numberOfColors?: number) {
  return chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColors);
}

function generatePalette(starterPalette: SeedColor) {
  let newPalette: Palette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id!,
    emoji: starterPalette.emoji,
    colors: {},
  };

  for (let level of levels) {
    newPalette.colors[level] = [];
  }

  for (let color of starterPalette.colors!) {
    let scale = getScale(color.color, 10).reverse();
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, '-'),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i]).css().replace('rgb', 'rgba').replace(')', ',1.0)'),
      });
    }
  }
  return newPalette;
}

export { generatePalette };
