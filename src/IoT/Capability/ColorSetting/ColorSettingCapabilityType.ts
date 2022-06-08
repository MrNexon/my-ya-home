import { CapabilityType } from '../CapabilityType';
import { Possibility } from '../../Possibility/Possibility';
import { ColorScene } from './ColorScene';
import { ColorKelvinTemperature } from './ColorKelvinTemperature';
import { CapabilityActionResult } from '../CapabilityActionResult';

export interface ColorSettingCapabilityType extends Possibility {
  type: CapabilityType.COLOR_SETTINGS;
  parameters: ColorSettingParametersCapabilityType;
}

export interface ColorSettingParametersCapabilityType {
  color_model?: 'hsv' | 'rgb';
  temperature_k?: {
    min: number;
    max: number;
  };
  color_scene?: {
    scenes: {
      id: ColorScene;
    }[];
  };
}

export type ColorSettingCapabilityState =
  | ColorSettingRGBCapabilityState
  | ColorSettingHSVCapabilityState
  | ColorSettingTemperatureCapabilityState
  | ColorSettingSceneCapabilityState;

export interface ColorSettingRGBCapabilityState
  extends Pick<ColorSettingCapabilityType, 'type'> {
  state: {
    instance: 'rgb';
    value: number;
  };
}

export interface ColorSettingHSVCapabilityState
  extends Pick<ColorSettingCapabilityType, 'type'> {
  state: {
    instance: 'hsv';
    value: {
      h: number;
      s: number;
      v: number;
    };
  };
}

export interface ColorSettingTemperatureCapabilityState
  extends Pick<ColorSettingCapabilityType, 'type'> {
  state: {
    instance: 'temperature_k';
    value: ColorKelvinTemperature;
  };
}

export interface ColorSettingSceneCapabilityState
  extends Pick<ColorSettingCapabilityType, 'type'> {
  state: {
    instance: 'scene';
    value: ColorScene;
  };
}

export interface ColorSettingCapabilityChange
  extends Pick<ColorSettingCapabilityType, 'type'> {
  state: {
    instance: 'rgb' | 'hsv' | 'temperature_k' | 'scene';
    action_result: CapabilityActionResult;
  };
}
