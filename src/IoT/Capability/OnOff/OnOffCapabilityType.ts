import { CapabilityType } from '../CapabilityType';
import { Possibility } from '../../Possibility/Possibility';
import { CapabilityActionResult } from '../CapabilityActionResult';

export interface OnOffCapabilityBase extends Possibility {
  type: CapabilityType.ON_OFF;
}

export type OnOffCapabilityType = OnOffCapabilityBase;

export interface OnOffCapabilityState
  extends Pick<OnOffCapabilityBase, 'type'> {
  state: {
    instance: 'on';
    value: boolean;
  };
}

export interface OnOffCapabilityChange
  extends Pick<OnOffCapabilityBase, 'type'> {
  state: {
    instance: 'on';
    action_result: CapabilityActionResult;
  };
}
