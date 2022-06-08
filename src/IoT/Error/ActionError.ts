import { ActionErrorCode } from './ActionErrorCode';

export type ActionError = {
  status: 'ERROR';
  error_code: ActionErrorCode;
};
