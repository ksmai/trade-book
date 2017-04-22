import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import './styles/styles.scss';

if (process.env.NODE_ENV === 'production') {
  require('@angular/core').enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

