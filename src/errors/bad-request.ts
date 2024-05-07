import CustomAPIError from './custom-api.js';
import { StatusCodes } from 'http-status-codes';

class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(StatusCodes.BAD_GATEWAY, message);
  }
}

export default BadRequestError;