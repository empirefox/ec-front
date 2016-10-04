import { writeFileSync } from 'fs';
import { join } from 'path';
import { format } from './format';

const stringifyObject = require('stringify-object');
const consts = require('./esecend_consts.json');

interface Typer {
  [index: string]: number;
}

export interface ConstMap {
  [index: string]: Typer;
}

let constMap = <ConstMap>{};
Object.keys(consts).forEach(typ => {
  let typer: Typer = {};
  (<string[]>consts[typ]).forEach((value, index) => typer[value] = index);
  constMap[typ] = typer;
});

let prettyConstMap = stringifyObject(constMap, {
  indent: ' ',
  singleQuotes: false,
  inlineCharacterLimit: 12,
});

let constsEntries = Object.keys(consts).map(typ => `${typ}: Object.keys(constMap.${typ}),`).join('\n');

let result = format(`
  export const constMap = ${prettyConstMap};
  export const consts = {${constsEntries}};
`);

writeFileSync(join(__dirname, '../src/app/core/consts/const-map.ts'), result);
