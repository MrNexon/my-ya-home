import { CapabilityType } from '../CapabilityType';
import { Possibility } from '../../Possibility/Possibility';
import { CapabilityActionResult } from '../CapabilityActionResult';
import { ToggleInstance } from './ToggleInstance';

export interface ToggleCapability extends Possibility {
  type: CapabilityType.TOGGLE;
  parameters: ToggleParametersCapability;
}

export interface ToggleParametersCapability {
  instance: ToggleInstance;
}

export interface ToggleCapabilityState extends Pick<ToggleCapability, 'type'> {
  state: {
    instance: ToggleInstance;
    value: boolean;
  };
}

export interface ToggleCapabilityChange extends Pick<ToggleCapability, 'type'> {
  state: {
    instance: ToggleInstance;
    action_result: CapabilityActionResult;
  };
}
