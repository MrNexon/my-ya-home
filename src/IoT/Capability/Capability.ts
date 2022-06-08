import { DeviceCapability } from './DeviceCapability';
import { DeviceCapabilityState } from './DeviceCapabilityState';
import { DeviceCapabilityChange } from './DeviceCapabilityChange';

export abstract class Capability {
  private readonly data: DeviceCapability;

  protected constructor(data: DeviceCapability) {
    this.data = data;
  }

  public get type(): string {
    return this.data.type;
  }

  public get instance(): string {
    return this.data.parameters.instance;
  }

  public abstract get value(): any;

  public abstract getState(): DeviceCapabilityState[];
  public abstract setState(
    state: DeviceCapabilityState
  ): DeviceCapabilityChange;

  public getInfo(): DeviceCapability {
    return this.data;
  }
}
