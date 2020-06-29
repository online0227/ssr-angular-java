import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import { NgxRequest, NgxResponse } from '@gorniv/ngx-universal';

import * as proxy from 'http-proxy-middleware'
import { isPlatformBrowser } from '@angular/common';

import { SERVER_ADDRESS, SSL, DOMAIN } from "./src/app/app.constants";

require('dotenv').config()

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/angular-java-ssr/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  // 프록시는 서버 사이드에서는 안먹히고, 클라이언트 사이드에서만 되는듯. 서버 콘솔에서 ERROR NetworkError 라는 에러가 뜸. 따라서 프록시를 쓸 수 없다.
  // 따라서 다른 방식으로, src/app/shared/services/http/http-intercepter-basic-auth.service.ts 에서 request 에 url 을 설정해줘서, 백엔드에 연결.
  // const jpaProxy = proxy('/', {
  //   target: SERVER_ADDRESS,
  //   changeOrigin: true,
  //   secure: false,
  //   // 여기서 정의해주는 newTarget을, 백엔드에서 request.getServerName() 로 참조할 수 있다.
  //   router: function (req) {
  //     let hostname = "www";
  //     if (req.headers['x-forwarded-host']) {
  //       hostname = req.headers['x-forwarded-host'].toString().split(".")[0];
  //     }
  //     let newTarget = (SSL ? "https://" : "http://") + hostname + `.${DOMAIN}`;
  //     return newTarget
  //   }
  // });

  // server.use('/jpa', jpaProxy);

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl },
        /// for cookie
        {
          provide: NgxRequest,
          useValue: req,
        },
        {
          provide: NgxResponse,
          useValue: res,
        },
      ]
    });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4200;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
