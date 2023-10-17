export enum CapabilityType {
  ON_OFF = 'devices.capabilities.on_off',
  COLOR_SETTINGS = 'devices.capabilities.color_setting',
  MODE = 'devices.capabilities.mode',
  RANGE = 'devices.capabilities.range',
  TOGGLE = 'devices.capabilities.toggle',
}

export const CapabilityBinType: Record<CapabilityType, number> = {
  [CapabilityType.ON_OFF]: 0,
  [CapabilityType.COLOR_SETTINGS]: 1,
  [CapabilityType.MODE]: 2,
  [CapabilityType.RANGE]: 3,
  [CapabilityType.TOGGLE]: 4,
}
