import {scrypt, randomBytes} from 'crypto';
// scrypt is callback based, so we need to use a Promise
import {promisify} from 'util';

const asyncedScrypt = promisify(scrypt);

export class Password {

    static async hashPassword(password: string) {

        const salt = randomBytes(8).toString('hex');

        // console.log('Salt is ', salt)

        // scrypt returns a buffer
        const buffered = (await asyncedScrypt(password, salt, 64)) as Buffer;

        // console.log('Buffered is ', buffered)

        // return the hashed password along with the salt
        return `${buffered.toString('hex')}.${salt}`;
    }

    static async comparePasswords(dbPass: string, suppliedPass: string) {

        // Steps needed to compare passwords:
        // 1. Split password and salt from dbPass
        // 2. Hash the supplied password with the salt
        // 3. Compare the hashed password with the hashed supplied pass and return true or false

        // split the password into the hashed password and salt
        const [pass, salt] = dbPass.split('.');
    
        const buf = (await asyncedScrypt(suppliedPass, salt, 64)) as Buffer;

        return buf.toString('hex') === pass;
    }
}