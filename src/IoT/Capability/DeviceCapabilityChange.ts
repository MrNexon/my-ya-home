import { OnOffCapabilityChange } from './OnOff/OnOffCapabilityType';
import { ColorSettingCapabilityChange } from './ColorSetting/ColorSettingCapabilityType';
import { ModeCapabilityChange } from './Mode/ModeTypeCapability';
import { RangeCapabilityChange } from './Range/RangeCapability';
import { ToggleCapabilityChange } from './Toggle/ToggleCapability';

export type DeviceCapabilityChange =
  | OnOffCapabilityChange
  | ColorSettingCapabilityChange
  | ModeCapabilityChange
  | RangeCapabilityChange
  | ToggleCapabilityChange;
