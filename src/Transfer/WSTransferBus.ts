import { EventEmitter } from 'events';
import { DeviceEvent } from '../IoT/Device/DeviceEvent';
import {RawData, WebSocket, WebSocketServer} from "ws";

export class WSTransferBus {
  public static events = new EventEmitter();
  public static clients: Map<string, WebSocket> = new Map();

  private static server;

  public static init() {
    this.server = new WebSocketServer({ port: 9000 });
    this.server.on('connection', (ws) => {
      ws.on('error', console.error);
      ws.on('message', (data) => WSTransferBus.onMessage(ws, data));
    });

    WSTransferBus.events.addListener('data', (data) => this.sender(data));
  }

  private static onMessage(connection: WebSocket, data: RawData): void {
    const message = data.toString('utf-8');
    this.clients.set(message, connection);
  }

  private static sender(deviceEvent: DeviceEvent): void {
    const id = deviceEvent.id;
    const client = this.clients.get(id);
    if (!client) return;

    deviceEvent.capability
  }
}
