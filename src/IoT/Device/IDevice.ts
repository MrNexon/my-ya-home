import {DeviceType} from './DeviceType';
import {DeviceCapability} from '../Capability/DeviceCapability';
import {ActionError} from '../Error/ActionError';
import {DeviceCapabilityState} from '../Capability/DeviceCapabilityState';
import {DeviceCapabilityChange} from '../Capability/DeviceCapabilityChange';
import {Capability} from '../Capability/Capability';
import lodash from '../../lodash';
import {EventEmitter} from 'events';

export interface DeviceParams {
  id: string;
  name: string;
  description?: string;
  room?: string;
  type: DeviceType;
  custom_data?: any;
  capabilities: DeviceCapability[];
}

export interface DeviceInfo extends DeviceParams {
  device_info: {
    manufacturer: string;
    model: string;
    hw_version?: string;
    sw_version?: string;
  };
}

export type DeviceFullState = Pick<DeviceParams, 'id'> &
  Partial<ActionError> &
  DeviceState;

export interface DeviceState {
  capabilities?: DeviceCapabilityState[];
}

export type DeviceFullChange = Pick<DeviceParams, 'id'> & DeviceChange;

export interface DeviceChange {
  capabilities: DeviceCapabilityChange[];
}

export declare interface Device extends EventEmitter {
  on(event: 'change', listener: (deviceId: number, value: Buffer) => void): this;

  emit(event: 'change', deviceId: number, value: Buffer): boolean;
}

export abstract class Device extends EventEmitter {
  public id: string;
  public name: string;
  public description?: string;
  public room?: string;
  public type: DeviceType;
  public capabilities: Capability[];
  public custom_data?: any;

  protected constructor(params: Omit<DeviceParams, 'capabilities'>) {
    super();
    const { custom_data, description, id, name, room, type } = params;
    this.id = id;
    this.name = name;
    this.description = description;
    this.room = room;
    this.type = type;
    this.custom_data = custom_data;
  }

  protected registerCapabilities(capabilities: Capability[]) {
    this.capabilities = capabilities;
  }

  public getInfo(): DeviceInfo {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      room: this.room,
      type: this.type,
      custom_data: this.custom_data,
      capabilities: this.capabilities.map((capability) => capability.getInfo()),
      device_info: {
        manufacturer: 'Custom manufacturer',
        model: 'Custom model',
      },
    };
  }

  public getState(custom_data?: any): DeviceFullState {
    const state: DeviceCapabilityState[] = [];
    this.capabilities.forEach((value) => {
      state.push(...value.getState());
    });
    return {
      id: this.id,
      capabilities: state,
    };
  }

  public setState(
    capabilities: DeviceCapabilityState[],
    custom_data?: any
  ): DeviceFullChange {
    const setResult = [];
    const capabilityMap = lodash.groupBy(
      this.capabilities,
      (capability) => capability.type
    );
    for (const capability of capabilities) {
      const changedCapabilityGroup = capabilityMap[capability.type];
      if (!changedCapabilityGroup || changedCapabilityGroup.length < 1)
        continue;
      setResult.push(
        ...changedCapabilityGroup.map((changedCapability) => {
          return changedCapability.setState(capability);
        })
      );
      this.onChange();
    }

    return {
      id: this.id,
      capabilities: lodash.compact(setResult),
    };
  }

  public abstract render(): Buffer;

  private onChange() {
    this.emit('change', parseInt(this.id), this.render());
  }
}
