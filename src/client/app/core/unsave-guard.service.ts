import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class UnsaveGuard implements CanDeactivate<any> {
  canDeactivate(component: any) {
    if (component.canDeactivate) {
      return component.canDeactivate();
    }

    return true;
  }
}

