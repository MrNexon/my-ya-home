import { Request, Response } from 'express';
import { LedStrip } from '../IoT/LedStrip';
import { Device } from '../IoT/Device/IDevice';
import { SSETransferBus } from '../Transfer/SSETransferBus';
import { AC } from '../IoT/AC';
import {DeviceEvent} from "../IoT/Device/DeviceEvent";
import {Capability} from "../IoT/Capability/Capability";
import {MQTTTransferBus} from "../Transfer/MQTTTransferBus";
import {BytePackage} from "../Transfer/BytePackage";
import {WSTransferBus} from "../Transfer/WSTransferBus";

const HOME = new Map<string, Device>();
HOME.set('led1', new LedStrip('led1', 'Свет'));
HOME.set('led2', new LedStrip('led2', 'Стол'));
//HOME.set(3, new AC(3));

export class IoTController {
  public static init() {
    HOME.forEach((device) => {
      device.on('change', (deviceId, value) => WSTransferBus.events.emit('data', deviceId, value));
    });
  }

  public static syncData() {
    const result: DeviceEvent[] = [];
    HOME.forEach((device) => {
      device.capabilities.forEach((capability: Capability) => {
        result.push({
          id: `${device.id}`,
          sync: true,
          capability: capability.type,
          value: capability.value,
        })
      })
    })
    return result;
  }

  public static syncBufferData() {
    const result: BytePackage[] = [];
    HOME.forEach((device) => {
      result.push(new BytePackage(parseInt(device.id), device.render(), true))
    })
    return result;
  }

  public static unlink(request: Request, response: Response) {
    const requestId = request.header('X-Request-Id');
    response.json({
      request_id: requestId,
    });
    response.end();
  }

  public static getDevices(request: Request, response: Response) {
    const requestId = request.header('X-Request-Id');
    const devices = [];
    HOME.forEach((device) => {
      devices.push(device.getInfo());
    });
    const result = {
      request_id: requestId,
      payload: {
        user_id: 'iam-1',
        devices: devices,
      },
    };

    response.json(result);
    response.end();
  }

  public static actionDevices(request: Request, response: Response) {
    const req_id = request.header('X-Request-Id');
    const data = request.body;
    //console.log(inspect(data.payload.devices, false, 5, true));
    if (!data || !data.payload) {
      response.end();
      return;
    }

    const deviceResult = data.payload.devices.map((device) => {
      const homeDevice = HOME.get(device.id);
      return homeDevice.setState(device.capabilities);
    });

    const result = {
      request_id: req_id,
      payload: {
        devices: deviceResult,
      },
    };

    response.json(result);
    response.end();
  }

  public static queryDevices(request: Request, response: Response) {
    const req_id = request.header('X-Request-Id');
    const data = request.body;
    if (!data || !data.devices) {
      response.end();
      return;
    }

    const deviceResult = data.devices.map((device) => {
      const homeDevice = HOME.get(device.id);
      return homeDevice.getState();
    });

    const result = {
      request_id: req_id,
      payload: {
        devices: deviceResult,
      },
    };

    response.json(result);
    response.end();
  }
}
