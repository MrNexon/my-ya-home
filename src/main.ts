import * as express from 'express';
import * as bodyParser from 'body-parser';
import { FakeAuthController } from './YandexApi/FakeAuthController';
import { IoTController } from './YandexApi/IoTController';
import { SSETransferBus } from './Transfer/SSETransferBus';
import {WSTransferBus} from "./Transfer/WSTransferBus";

const app = express();
const port = 3000;

const pack = require('../package.json');

async function bootstrap() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  WSTransferBus.init();
  IoTController.init();

  app.get('/auth', FakeAuthController.fakeAuth);
  app.post('/token', FakeAuthController.getToken);
  app.get('/success', FakeAuthController.success);

  app.head('/v1.0', (req, res) => res.status(200).end());
  app.post('/v1.0/user/unlink', IoTController.unlink);
  app.get('/v1.0/user/devices', IoTController.getDevices);
  app.post('/v1.0/user/devices/query', IoTController.queryDevices);
  app.post('/v1.0/user/devices/action', IoTController.actionDevices);

  app.get('/events', SSETransferBus.startStream);

  app.listen(port, () => {
    console.log(`Smart home server stated with port ${port}\nVersion: ${pack.version}`);
  });
}


bootstrap();
