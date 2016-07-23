export interface KuaidiItem {
  name: string;
}

export const kuaidi100map = <Dict<KuaidiItem>>require('./kuaidi100.json');
