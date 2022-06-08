import {Capability, CapabilityValue} from '../Capability';
import { CapabilityType } from '../CapabilityType';
import { DeviceCapabilityState } from '../DeviceCapabilityState';
import { DeviceCapabilityChange } from '../DeviceCapabilityChange';
import { ColorScene } from './ColorScene';

export class ColorSettingCapability extends Capability {
  public rgbValue: number;
  public scene: ColorScene | undefined;

  private lastSet: 'rgb' | 'scene';

  constructor(rgbColor: number, scene?: ColorScene) {
    super({
      type: CapabilityType.COLOR_SETTINGS,
      parameters: {
        color_model: 'rgb',
        color_scene: {
          scenes: [
            {
              id: ColorScene.ALARM,
            },
            {
              id: ColorScene.CANDLE,
            },
          ],
        },
      },
    });

    this.rgbValue = rgbColor;
    this.scene = scene;
  }

  public get value(): CapabilityValue {
    if (this.lastSet == 'scene')
      return {
        type: 'scene',
        value: this.scene,
      };
    else
      return {
        type: 'rgb',
        value: this.rgbValue,
      };
  }

  public getState(): DeviceCapabilityState[] {
    const result: DeviceCapabilityState[] = [
      {
        type: CapabilityType.COLOR_SETTINGS,
        state: {
          instance: 'rgb',
          value: this.rgbValue,
        },
      },
    ];

    if (this.scene)
      result.push({
        type: CapabilityType.COLOR_SETTINGS,
        state: {
          instance: 'scene',
          value: this.scene,
        },
      });

    return result;
  }

  public setState(state: DeviceCapabilityState): DeviceCapabilityChange {
    if (state.type != CapabilityType.COLOR_SETTINGS) return;
    if (state.state.instance == 'rgb') this.rgbValue = state.state.value;
    else if (state.state.instance == 'scene')
      this.scene = ColorScene[state.state.value.toUpperCase()];
    else return;

    this.lastSet = state.state.instance;
    return {
      type: CapabilityType.COLOR_SETTINGS,
      state: {
        instance: state.state.instance,
        action_result: {
          status: 'DONE',
        },
      },
    };
  }
}
