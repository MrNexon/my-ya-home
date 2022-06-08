import { OnOffCapabilityType } from './OnOff/OnOffCapabilityType';
import { ModeTypeCapability } from './Mode/ModeTypeCapability';
import { RangeCapability } from './Range/RangeCapability';
import { ToggleCapability } from './Toggle/ToggleCapability';
import { ColorSettingCapabilityType } from './ColorSetting/ColorSettingCapabilityType';

export type DeviceCapability =
  | OnOffCapabilityType
  | ColorSettingCapabilityType
  | ModeTypeCapability
  | RangeCapability
  | ToggleCapability;
