import { writeFileSync } from 'fs';
import { join } from 'path';
import toPairs = require('lodash/toPairs');
import { format } from './format';
import { translate } from './translate';
import * as typsTrans from './trans-values';

const stringifyObject = require('stringify-object');
const consts = require('./esecend_consts.json');

const transTargets = 'OrderState,UserCashType'.split(',');

const stringifyOpts = {
  indent: ' ',
  singleQuotes: true,
  inlineCharacterLimit: 12,
};

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

let tsConstsEntries = Object.keys(consts).map(typ => `${typ}: Object.keys(constMap.${typ}),`).join('\n');

let constsTransMap = {};
transTargets.forEach(typ => {
  constsTransMap[typ] = translate(typ);
});

let tsResult = format(`
  export const constMap = ${stringifyObject(constMap, stringifyOpts)};

  export const consts = {${tsConstsEntries}};

  export const constTransMap = ${stringifyObject(constsTransMap, stringifyOpts).replace(/\s*'([0-9]+)'\s*:\s*/g, '$1 :')};
`);

writeFileSync(join(__dirname, '../src/app/core/consts/const-map.ts'), tsResult);

// java
let javaConstTyps = Object.keys(consts).map(typ => {
  let fields = (<string[]>consts[typ]).map((value, index) => `public static int ${value} = ${index};`).join('\n');
  return `
  public final static class ${typ} {
		${fields}
	}
  `
});

let javaTransTyps = transTargets.map(typ => {
  let typTrans = typsTrans[typ];
  let fields = Object.keys(typTrans).map(field => `public static String ${field} = "${typTrans[field]}";`).join('\n');
  return `
  public final static class ${typ} {
		${fields}
	}
  `
});

let javaTransArr = Object.keys(constsTransMap).map(typ => {
  let typTrans = constsTransMap[typ];
  let arr = toPairs(typTrans).sort((a, b) => a[0] - b[0]).map(item => item[1]);
  return `public final static String[] ${typ} = ${JSON.stringify(arr)};`;
});

let javaTransArrClass = `
  public final class BackendConstTransArrs {
		${javaTransArr.join('\n')}
	}
  `;

let javaConst = `public final class BackendConst {
	${javaConstTyps.join('')}
}`;

let javaConstTrans = `public final class BackendConstTrans {
	${javaTransTyps.join('')}
}`;

writeFileSync(join(__dirname, './BackendConst.java'), javaConst);
writeFileSync(join(__dirname, './BackendConstTrans.java'), javaConstTrans);
writeFileSync(join(__dirname, './BackendConstTransArrs.java'), javaTransArrClass);