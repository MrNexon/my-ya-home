import { Device } from './Device/IDevice';
import { DeviceType } from './Device/DeviceType';
import { OnOffCapability } from './Capability/OnOff/OnOffCapability';
import { ColorSettingCapability } from './Capability/ColorSetting/ColorSettingCapability';
import {RangeBrightnessCapability} from "./Capability/Range/RangeBrightnessCapability";

export class LedStrip extends Device {
  public readonly onOff: OnOffCapability;
  public readonly color: ColorSettingCapability;
  public readonly brightness: RangeBrightnessCapability;

  constructor() {
    super({
      id: 'led_strip',
      name: 'Лента',
      type: DeviceType.LIGHT,
    });

    this.onOff = new OnOffCapability(false);
    this.color = new ColorSettingCapability(16714250);
    this.brightness = new RangeBrightnessCapability(0);
    this.registerCapabilities([this.onOff, this.color, this.brightness]);
  }
}
