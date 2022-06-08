import { ActionError } from '../Error/ActionError';

export type CapabilityActionResult = CapabilityActionResultDone | ActionError;

interface CapabilityActionResultDone {
  status: 'DONE';
}
