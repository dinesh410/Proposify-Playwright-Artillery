import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  validUser: process.env.VALID_USER || '',
  validPassword: process.env.VALID_PASSWORD || '',
};
