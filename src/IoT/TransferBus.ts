import { EventEmitter } from 'events';
import { Request, Response } from 'express';
import { DeviceEvent } from './Device/DeviceEvent';

export class TransferBus {
  public static events = new EventEmitter();

  public static startStream(request: Request, response: Response) {
    response.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
    });
    response.flushHeaders();
    response.write('retry: 1000\n\n');

    const sender = (data: DeviceEvent) => {
      response.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    TransferBus.events.addListener('data', sender);

    response.on('close', () => {
      TransferBus.events.removeListener('data', sender);
    });
  }
}
