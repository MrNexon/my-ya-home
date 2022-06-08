import { CapabilityType } from '../CapabilityType';
import { DeviceCapabilityState } from '../DeviceCapabilityState';
import { DeviceCapabilityChange } from '../DeviceCapabilityChange';
import { ModeInstance } from './ModeInstance';
import {Capability, CapabilityValue} from '../Capability';
import { ModeValue } from './ModeValue';

export class ModeCapability extends Capability {
  public _value: ModeValue;

  constructor(
    property: ModeInstance,
    modes: ModeValue[],
    initialValue: ModeValue
  ) {
    super({
      type: CapabilityType.MODE,
      parameters: {
        instance: property,
        modes: modes.map((mode) => ({ value: mode })),
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
        type: CapabilityType.MODE,
        state: {
          instance: <ModeInstance>this.instance,
          value: this._value,
        },
      },
    ];
  }

  public setState(state: DeviceCapabilityState): DeviceCapabilityChange {
    if (state.type != CapabilityType.MODE) return;
    if (state.state.instance != this.instance) return;

    this._value = state.state.value;
    return {
      type: CapabilityType.MODE,
      state: {
        instance: <ModeInstance>this.instance,
        action_result: {
          status: 'DONE',
        },
      },
    };
  }
}
