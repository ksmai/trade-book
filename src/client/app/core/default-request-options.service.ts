import { Injectable } from '@angular/core';
import { RequestOptions, BaseRequestOptions } from '@angular/http';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
  constructor() {
    super();
    this.headers.set('Content-Type', 'application/json');
  }
}

export const defaultRequestOptionsProvider = {
  provide: RequestOptions,
  useClass: DefaultRequestOptions,
};

