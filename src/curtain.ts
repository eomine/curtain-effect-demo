import { clamp, isMobile } from "./utils";

interface CurtainParams {
  overlayClass: string;
  overlayDarkness: number;
}

const defaultParams: CurtainParams = {
  overlayClass: 'curtain-overlay',
  overlayDarkness: 0.4,
};

class Curtain {
  private root: HTMLElement;

  private children: HTMLElement[];

  private params: CurtainParams;

  constructor(root: HTMLElement, params?: Partial<CurtainParams>) {
    this.params = Object.assign(defaultParams, params);
    this.root = root;
    this.children = Array.from(this.root.children) as HTMLElement[];
  }

  init(): void {
    if (isMobile()) {
      return;
    }

    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('scroll', this.onScroll.bind(this));
    this.initChildren();
    this.onResize();
    this.onScroll();
  }

  private initChildren() {
    const { overlayClass } = this.params;
    this.children.forEach((child, index) => {
      const overlay = document.createElement('div');
      overlay.classList.add(overlayClass);
      child.style.zIndex = String(this.children.length - index);
      child.appendChild(overlay);
    });
  }

  private onResize() {
    let h = 0;
    for (let i = 0; i < this.children.length; i += 1) {
      h += this.children[i].scrollHeight;
    }
    this.root.style.height = `${h}px`;
  }

  private onScroll() {
    if (isMobile()) {
      return;
    }

    const { overlayClass, overlayDarkness } = this.params;
    const wh = window.innerHeight;
    const y = window.scrollY;
    let minY = 0;
    let maxY = 0;
    this.children.forEach((child) => {
      const childHeight = child.scrollHeight;
      const overlay = child.querySelector<HTMLElement>(`.${overlayClass}`)!;

      minY = maxY;
      maxY = minY + childHeight;
      let deltaY = 0;
      let opacity = 0;
      if (y < minY) {
        deltaY = 0;
        opacity = (minY - y) / wh;
        opacity = clamp(opacity, 0, overlayDarkness);
      } else if (y > maxY) {
        deltaY = 0 - childHeight;
      } else {
        deltaY = minY - y;
      }

      child.style.transform = `translateY(${deltaY}px)`;
      overlay.style.opacity = String(opacity);
    });
  }
}

export { Curtain };
