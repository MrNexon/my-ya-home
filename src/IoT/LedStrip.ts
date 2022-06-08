import { Device } from './Device/IDevice';
import { DeviceType } from './Device/DeviceType';
import { OnOffCapability } from './Capability/OnOff/OnOffCapability';
import { ColorSettingCapability } from './Capability/ColorSetting/ColorSettingCapability';

export class LedStrip extends Device {
  public readonly onOff: OnOffCapability;
  public readonly color: ColorSettingCapability;

  constructor() {
    super({
      id: 'led_strip',
      name: 'Лента',
      type: DeviceType.LIGHT,
    });

    this.onOff = new OnOffCapability(false);
    this.color = new ColorSettingCapability(16714250);
    this.registerCapabilities([this.onOff, this.color]);
  }
}
