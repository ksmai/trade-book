import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationTriggerMetadata,
} from '@angular/animations';

const ROUTE_ENTER_EASE = '.75s cubic-bezier(0, 0, 0.2, 1)';
const ROUTE_LEAVE_EASE = '.55s cubic-bezier(0.4, 0, 1, 1)';

export const scaleInOut: AnimationTriggerMetadata = trigger('scaleInOut', [
  state('*', style({ transform: 'scale(1)'})),
  transition(':enter', [
    style({ transform: 'scale(0)'}),
    animate(ROUTE_ENTER_EASE),
  ]),
  transition(':leave', [
    animate(ROUTE_LEAVE_EASE, style({ transform: 'scale(0)'})),
  ]),
]);

