import difference from 'lodash-es/difference';
const consts = require('./esecend_consts.json');
import * as typsTrans from './trans-values';

export function translate(typ: string) {

  let typConst = consts[typ] as string[];
  let typTrans = typsTrans[typ];

  // validate all trans is in consts
  let diff = difference(Object.keys(typTrans), typConst);
  if (diff && diff.length) {
    console.error(`${typ} trans not in consts: ${diff}`);
  }

  let transResult = {};

  typConst.forEach((name, index) => {
    let v = typTrans[name];
    if (!v) {
      console.error(`${typ}.${name} trans not found`);
    }
    transResult[index] = v;
  });

  return transResult;
}