import { Curtain } from './curtain';

const element = document.querySelector<HTMLElement>('.curtains');
if (element) {
  const curtain = new Curtain(element);
  curtain.init();
}
