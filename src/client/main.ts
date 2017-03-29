// TODO move to somewhere else
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
Error['stackTraceLimit'] = Infinity;
import 'zone.js/dist/long-stack-trace-zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import './styles.scss';

platformBrowserDynamic().bootstrapModule(AppModule);

