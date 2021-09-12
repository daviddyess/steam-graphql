import md5 from 'md5';

/**
 * AWS Storage URL
 */
export const awsServer = `https://${process.env.AWS_S3_BUCKET}.s3-${process.env.AWS_DEFAULT_REGION}.amazonaws.com/`;
/**
 * Get IP Address from Request
 * @param {} req
 * @returns
 */
export function getIpAddress(req) {
  return (
    (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
  );
}
/**
 * Generate Identifier from Request
 * @param {*} req
 * @returns
 */
export function getRequestIdentifier(req) {
  return md5(`${getIpAddress(req)} + ${req.headers['user-agent']}`);
}
/**
 * Current Time Stamp
 * @returns Date String
 */
export const timeStamp = () => {
  const date = new Date(Date.now());

  return date.toISOString();
};

/**
 * Future Time Stamp
 */
export const futureTime = ({ hours }) => {
  const date = new Date(Date.now() + hours * 60 * 60 * 1000);

  return date.toISOString();
};

export class Status {
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = 'success';
  }

  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  send(res) {
    const result = {
      status: this.type,
      message: this.message,
      data: this.data
    };

    if (this.type === 'success') {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message
    });
  }
}
