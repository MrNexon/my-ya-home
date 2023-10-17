import { EventEmitter } from 'events';
import { Request, Response } from 'express';
import {IoTController} from "../YandexApi/IoTController";
import {BytePackage} from "./BytePackage";

export class SSETransferBus {
  public static events = new EventEmitter();

  public static startStream(request: Request, response: Response) {
    response.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
    });
    response.flushHeaders();

    const syncData = IoTController.syncBufferData();
    syncData.forEach((data) => {
      response.write(data.render());
    });

    const pingInterval = setInterval(() => {
      response.write(':ping\n');
    }, 2000);

    const sender = (data: BytePackage) => {
      response.write(data.render());
    };

    SSETransferBus.events.addListener('data', sender);

    response.on('close', () => {
      clearInterval(pingInterval);
      SSETransferBus.events.removeListener('data', sender);
    });
  }
}
