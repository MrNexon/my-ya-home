import { OnOffCapabilityState } from './OnOff/OnOffCapabilityType';
import { ColorSettingCapabilityState } from './ColorSetting/ColorSettingCapabilityType';
import {
  ModeCapabilityChange,
  ModeCapabilityState,
} from './Mode/ModeTypeCapability';
import { RangeCapabilityState } from './Range/RangeCapability';
import {
  ToggleCapabilityChange,
  ToggleCapabilityState,
} from './Toggle/ToggleCapability';

export type DeviceCapabilityState =
  | OnOffCapabilityState
  | ColorSettingCapabilityState
  | ModeCapabilityState
  | RangeCapabilityState
  | ToggleCapabilityState;
