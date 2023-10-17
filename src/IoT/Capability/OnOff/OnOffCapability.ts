import {Capability, CapabilityValue} from '../Capability';
import { CapabilityType } from '../CapabilityType';
import { DeviceCapabilityState } from '../DeviceCapabilityState';
import { DeviceCapabilityChange } from '../DeviceCapabilityChange';

export class OnOffCapability extends Capability {
  public _value: boolean;

  constructor(initialValue: boolean) {
    super({
      type: CapabilityType.ON_OFF,
    });
    this._value = initialValue;
  }

  public get value(): CapabilityValue {
    return {
      type: 'on',
      value: this._value
    }
  }

  public getState(): DeviceCapabilityState[] {
    return [
      {
        type: CapabilityType.ON_OFF,
        state: {
          instance: 'on',
          value: this._value,
        },
      },
    ];
  }

  public setState(state: DeviceCapabilityState): DeviceCapabilityChange {
    if (state.type != CapabilityType.ON_OFF) return;

    this._value = state.state.value;
    return {
      type: CapabilityType.ON_OFF,
      state: {
        instance: 'on',
        action_result: {
          status: 'DONE',
        },
      },
    };
  }

  public get byteValue(): Uint8Array {
    const result = new Uint8Array(1);
    result[0] = this._value ? 255 : 0;
    return result;
  }
}
