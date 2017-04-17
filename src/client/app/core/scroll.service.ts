import { Injectable } from '@angular/core';

@Injectable()
export class ScrollService {
  private scrolling = false;

  scrollTo(x: number, y: number, frames = 12) {
    if (this.scrolling) return;

    const isSupported = window &&
      window.scrollTo &&
      window.requestAnimationFrame;
    if (!isSupported) return;

    this.scrolling = true;
    let currentX = window.scrollX;
    let currentY = window.scrollY;
    const dx = x - currentX;
    const dy = y - currentY;

    this.tick(0, frames, currentX, currentY, dx, dy, x, y);
  }

  private tick(
    currentFrame: number,
    frames: number,
    x: number,
    y: number,
    dx: number,
    dy: number,
    endX: number,
    endY: number
  ) {
    const frac = this.ease(currentFrame, frames);
    const stepX = dx * frac;
    const stepY = dy * frac;
    const nextX = x + stepX;
    const nextY = y + stepY;
    window.scrollTo(nextX, nextY);
    
    if (currentFrame + 1 < frames) {
      window.requestAnimationFrame(() => this.tick(
        currentFrame + 1,
        frames,
        nextX,
        nextY,
        dx,
        dy,
        endX,
        endY
      ));
    } else {
      window.scrollTo(endX, endY);
      this.scrolling = false;
    }
  }

  private ease(current: number, total: number) {
    function beizer(t: number) {
      return t * t * (3 - 2 * t);
    }

    return beizer((current + 1) / total) - beizer(current / total);
  }
}

