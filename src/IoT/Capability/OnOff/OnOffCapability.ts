import { Capability } from '../Capability';
import { CapabilityType } from '../CapabilityType';
import { DeviceCapabilityState } from '../DeviceCapabilityState';
import { DeviceCapabilityChange } from '../DeviceCapabilityChange';

export class OnOffCapability extends Capability {
  public value: boolean;

  constructor(initialValue: boolean) {
    super({
      type: CapabilityType.ON_OFF,
    });
    this.value = initialValue;
  }

  public getState(): DeviceCapabilityState[] {
    return [
      {
        type: CapabilityType.ON_OFF,
        state: {
          instance: 'on',
          value: this.value,
        },
      },
    ];
  }

  public setState(state: DeviceCapabilityState): DeviceCapabilityChange {
    if (state.type != CapabilityType.ON_OFF) return;

    this.value = state.state.value;
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
}
