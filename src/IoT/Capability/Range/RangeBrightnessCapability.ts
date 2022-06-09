import {Capability, CapabilityValue} from '../Capability';
import { CapabilityType } from '../CapabilityType';
import { DeviceCapabilityState } from '../DeviceCapabilityState';
import { DeviceCapabilityChange } from '../DeviceCapabilityChange';
import { RangeInstance } from './RangeInstance';
import { RangeUnit } from './RangeUnit';

export class RangeBrightnessCapability extends Capability {
  public _value: number;

  constructor(initialValue: number) {
    super({
      type: CapabilityType.RANGE,
      parameters: {
        instance: RangeInstance.BRIGHTNESS,
        unit: RangeUnit.PERCENT,
        random_access: true,
        range: {
          min: 0,
          max: 100,
        },
      },
    });
    this._value = initialValue;
  }

  public get value(): CapabilityValue {
    return {
      type: this.instance,
      value: this._value,
    };
  }

  public getState(): DeviceCapabilityState[] {
    return [
      {
        type: CapabilityType.RANGE,
        state: {
          instance: RangeInstance.BRIGHTNESS,
          value: this._value,
        },
      },
    ];
  }

  public setState(state: DeviceCapabilityState): DeviceCapabilityChange {
    if (state.type != CapabilityType.RANGE) return;

    this._value = state.state.value;
    return {
      type: CapabilityType.RANGE,
      state: {
        instance: RangeInstance.BRIGHTNESS,
        action_result: {
          status: 'DONE',
        },
      },
    };
  }
}
