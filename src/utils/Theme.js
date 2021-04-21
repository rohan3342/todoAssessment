import { ROOTSTORE } from '../../index';

export const _DarkTheme = {
  d_bgColor: '#262626',
  d_headerColor: '#e05043',
  d_txtColor: '#fff',
  d_activeCountBGColor: 'rgba(224, 80, 67,0.15)',
  d_icon: '#383972',
  d_preferenceTxt: '#505187',
  d_grey: 'grey',
  d_switch: '#ccc',
};

export const _LightTheme = {
  l_bgColor: '#fff',
  l_headerColor: '#e62d1d',
  l_headerColor2: '#383972',
  l_activeCountBGColor: 'rgba(224, 80, 67,0.15)',
  l_grey: '#ddd',
  l_switch: '#fff',
};

export function DarkTheme() {
  const { home } = ROOTSTORE.getState();
  return home.darkTheme;
}
