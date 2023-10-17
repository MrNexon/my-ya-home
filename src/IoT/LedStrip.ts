import { Device } from './Device/IDevice';
import { DeviceType } from './Device/DeviceType';
import { OnOffCapability } from './Capability/OnOff/OnOffCapability';
import { ColorSettingCapability } from './Capability/ColorSetting/ColorSettingCapability';
import {RangeBrightnessCapability} from "./Capability/Range/RangeBrightnessCapability";

export class LedStrip extends Device {
  public readonly onOff: OnOffCapability;
  public readonly color: ColorSettingCapability;
  public readonly brightness: RangeBrightnessCapability;

  constructor(id: number, name: string) {
    super({
      id: id,
      name: name,
      type: DeviceType.LIGHT,
    });

    this.onOff = new OnOffCapability(false);
    this.color = new ColorSettingCapability(16714250);
    this.brightness = new RangeBrightnessCapability(0);
    this.registerCapabilities([this.onOff, this.color, this.brightness]);
  }

  public render(): Buffer {
    const uintArray = new Uint8Array(5);
    uintArray.set(this.onOff.byteValue, 0);
    uintArray.set(this.brightness.byteValue, 1);
    uintArray.set(this.color.byteValue, 2);

    return Buffer.from(uintArray);
  }
}
