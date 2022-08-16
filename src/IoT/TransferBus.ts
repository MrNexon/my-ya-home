import { EventEmitter } from 'events';
import { Request, Response } from 'express';
import { DeviceEvent } from './Device/DeviceEvent';
import {IoTController} from "../YandexApi/IoTController";

export class TransferBus {
  public static events = new EventEmitter();

  public static startStream(request: Request, response: Response) {
    response.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
    });
    response.flushHeaders();

    const syncData = IoTController.syncData();
    syncData.forEach((data) => {
      response.write(`${JSON.stringify(data)}\n`);
    })

    const pingInterval = setInterval(() => {
      response.write(':ping\n');
    }, 2000);

    const sender = (data: DeviceEvent) => {
      response.write(`${JSON.stringify(data)}\n`);
    };

    TransferBus.events.addListener('data', sender);

    response.on('close', () => {
      clearInterval(pingInterval);
      TransferBus.events.removeListener('data', sender);
    });
  }
}
