import {Capability, CapabilityValue} from '../Capability';
import { CapabilityType } from '../CapabilityType';
import { DeviceCapabilityState } from '../DeviceCapabilityState';
import { DeviceCapabilityChange } from '../DeviceCapabilityChange';
import { RangeInstance } from './RangeInstance';
import { RangeUnit } from './RangeUnit';

export class RangeTemperatureCapability extends Capability {
  public _value: number;

  constructor(min: number, max: number, initialValue: number) {
    super({
      type: CapabilityType.RANGE,
      parameters: {
        instance: RangeInstance.TEMPERATURE,
        unit: RangeUnit.CELSIUS,
        random_access: true,
        range: {
          min: min,
          max: max,
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
          instance: RangeInstance.TEMPERATURE,
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
        instance: RangeInstance.TEMPERATURE,
        action_result: {
          status: 'DONE',
        },
      },
    };
  }
}
