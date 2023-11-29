import { jwtVerify, SignJWT } from 'jose';
import { config } from 'dotenv';

config();

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const signJwt = async (payload: { id: string; role: string }) => {
  try {
    const alg = 'HS256';
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime('30d')
      .setIssuedAt()
      .setSubject(payload.id.toString())
      .sign(secret);
  } catch (error) {
    throw error;
  }
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    return (await jwtVerify(token, secret)).payload as T;
  } catch (error) {
    console.error('error');
    throw new Error('Your token has expired');
  }
};
