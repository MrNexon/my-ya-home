import * as MQTT from "mqtt";
import {DeviceEvent} from "../IoT/Device/DeviceEvent";
import {EventEmitter} from "events";
import {inspect} from "util";
import {Device} from "../IoT/Device/IDevice";

export class MQTTTransferBus {
  private static client: MQTT.MqttClient;
  public static events = new EventEmitter();

  public static init() {
    console.log('Connecting to MQTT broker');
    this.client = MQTT.connect({
      port: 4997,
      host: 'localhost',
    });
    this.client.on('connect', (params) => {
      console.log(`[MQTT] Client connected`);

      this.client.subscribe('status', (err) => {
        if (err) {
          console.error('[MQTT] Subscribe to "status" topic error:');
          console.error(err);
        } else {
          this.client.publish('status', 'server:check');
        }
      });
    });
    this.client.on('error', (err) => {
      console.error('[MQTT] MQTT Error');
      console.error(err);
    });
    this.client.on('disconnect', (params) => {
      console.log('[MQTT] Client disconnected');
      console.debug(params);
    });
    this.client.on('packetsend', (packet) => {
      if (packet.cmd == 'publish') {
        console.debug(`[MQTT] Packet send (Payload => Topic): "${packet.payload.toString('hex')}" => "${packet.topic}"`);
      }
    })
    this.client.on('message', (topic, message) => {
      if (topic == 'status') {
        console.log(`[MQTT] Received status message: "${message.toString('utf-8')}"`);
      } else {
        console.debug(`[MQTT] Received status message: "${message.toString('binary')}"`);
      }
    });

    const sender = (deviceId: string, data: Buffer) => {
      //console.log(`Device ${deviceId}: ${inspect(data)}`);
      this.client.publish(`iot/${deviceId}`, data);
    };

    this.events.addListener('data', sender);
  }

}
