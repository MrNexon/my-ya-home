import { Device } from './Device/IDevice';
import { DeviceType } from './Device/DeviceType';
import { OnOffCapability } from './Capability/OnOff/OnOffCapability';
import { RangeTemperatureCapability } from './Capability/Range/RangeTemperatureCapability';
import { ModeCapability } from './Capability/Mode/ModeCapability';
import { ModeInstance } from './Capability/Mode/ModeInstance';
import { ModeValue } from './Capability/Mode/ModeValue';

export class AC extends Device {
  public readonly onOff: OnOffCapability;
  public readonly temperature: RangeTemperatureCapability;
  public readonly fanSpeed: ModeCapability;
  public readonly mode: ModeCapability;

  constructor(id: string) {
    super({
      id: id,
      name: 'Кондиционер',
      type: DeviceType.AC,
    });

    this.onOff = new OnOffCapability(false);
    this.temperature = new RangeTemperatureCapability(17, 30, 21);
    this.fanSpeed = new ModeCapability(
      ModeInstance.FAN_SPEED,
      [ModeValue.LOW, ModeValue.MEDIUM, ModeValue.HIGH, ModeValue.AUTO],
      ModeValue.AUTO
    );
    this.mode = new ModeCapability(
      ModeInstance.THERMOSTAT,
      [
        ModeValue.AUTO,
        ModeValue.COOL,
        ModeValue.DRY,
        ModeValue.HEAT,
        ModeValue.FAN_ONLY,
      ],
      ModeValue.AUTO
    );
    this.registerCapabilities([
      this.onOff,
      this.temperature,
      this.fanSpeed,
      this.mode,
    ]);
  }

  public render(): Buffer {
    const uintArray = new Uint8Array(4);
    uintArray.set(this.onOff.byteValue, 0);
    uintArray.set(this.temperature.byteValue, 1);
    uintArray.set(this.fanSpeed.byteValue, 2);
    uintArray.set(this.mode.byteValue, 3);

    return Buffer.from(uintArray);
  }
}
