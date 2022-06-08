import { CapabilityType } from '../CapabilityType';
import { Possibility } from '../../Possibility/Possibility';
import { RangeInstance } from './RangeInstance';
import { RangeUnit } from './RangeUnit';
import { CapabilityActionResult } from '../CapabilityActionResult';

export interface RangeCapability extends Possibility {
  type: CapabilityType.RANGE;
  parameters: RangeParametersCapability;
}

export type RangeParametersCapability =
  | RangePercentParametersCapability
  | RangePartialPercentParametersCapability
  | RangeTemperatureParametersCapability
  | RangeChannelParametersCapability;

export interface RangePercentParametersCapability {
  instance:
    | RangeInstance.BRIGHTNESS
    | RangeInstance.HUMIDITY
    | RangeInstance.OPEN;
  unit: RangeUnit.PERCENT;
  random_access?: boolean;
  range?: {
    min?: number;
    max?: number;
    precision?: number;
  };
}

export interface RangePartialPercentParametersCapability {
  instance: RangeInstance.VOLUME;
  unit: RangeUnit.PERCENT | undefined;
  random_access?: boolean;
  range?: {
    min?: number;
    max?: number;
    precision?: number;
  };
}

export interface RangeTemperatureParametersCapability {
  instance: RangeInstance.TEMPERATURE;
  unit: RangeUnit.CELSIUS | RangeUnit.KELVIN;
  random_access?: boolean;
  range?: {
    min?: number;
    max?: number;
    precision?: number;
  };
}

export interface RangeChannelParametersCapability {
  instance: RangeInstance.CHANNEL;
  random_access?: boolean;
  range?: {
    min?: number;
    max?: number;
    precision?: number;
  };
}

export interface RangeCapabilityState extends Pick<RangeCapability, 'type'> {
  state: {
    instance: RangeInstance;
    value: number;
  };
}

export interface RangeCapabilityChange extends Pick<RangeCapability, 'type'> {
  state: {
    instance: RangeInstance;
    action_result: CapabilityActionResult;
  };
}
