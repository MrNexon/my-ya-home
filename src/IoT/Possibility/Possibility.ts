import { CapabilityType } from '../Capability/CapabilityType';

export type PossibilityType = CapabilityType;

export interface Possibility {
  type: PossibilityType;
  retrievable?: boolean;
  reportable?: boolean;
  parameters?: any;
}
