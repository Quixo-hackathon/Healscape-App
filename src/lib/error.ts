export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      isOperational: error.isOperational
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
      isOperational: false
    };
  }

  return {
    message: 'An unknown error occurred',
    statusCode: 500,
    isOperational: false
  };
};