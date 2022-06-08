import { CapabilityType } from '../CapabilityType';
import { Possibility } from '../../Possibility/Possibility';
import { ModeInstance } from './ModeInstance';
import { ModeValue } from './ModeValue';
import { CapabilityActionResult } from '../CapabilityActionResult';

export interface ModeTypeCapability extends Possibility {
  type: CapabilityType.MODE;
  parameters: ModeParametersCapability;
}

export interface ModeParametersCapability {
  instance: ModeInstance;
  modes: {
    value: ModeValue;
  }[];
}

export interface ModeCapabilityState extends Pick<ModeTypeCapability, 'type'> {
  state: {
    instance: ModeInstance;
    value: ModeValue;
  };
}

export interface ModeCapabilityChange extends Pick<ModeTypeCapability, 'type'> {
  state: {
    instance: ModeInstance;
    action_result: CapabilityActionResult;
  };
}
