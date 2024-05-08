import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api';

class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(StatusCodes.BAD_GATEWAY, message);
  }
}

export default BadRequestError;