import { eq } from 'drizzle-orm';
import CryptoJS from 'crypto-js';
import { config } from 'dotenv';
import { users } from '../db/schema/schema.js';
import { db } from '../db/db.js';
config();
const registerUser = async (req, res) => {
    // Extract the values from the request
    const { password, firstName, lastName, email, phone } = req.body;
    // check if all required fields are provided
    if (!password || !firstName || !lastName || !email || !phone) {
        // if all fields are not provided, return a 409 response with an error message
        return res.status(422).json({ message: 'All fields are required' });
    }
    else {
        // Check if there is an existing user with the same email address
        const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.email, email));
        if (existingUser) {
            // If a user with the same email exists, return a 409 response with an error message
            return res
                .status(409)
                .json({ message: 'This email address is already taken' });
        }
        try {
            // Hash the password with cryptoJS and create a new User
            const register = await db
                .insert(users)
                .values({
                passwordHash: CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET).toString(),
                email: email.toLowerCase(),
                firstName,
                lastName,
                phone
            })
                .returning();
            const { passwordHash, ...rest } = register[0];
            res.status(201).json({ ...rest });
        }
        catch (error) {
            console.log(error);
            // if (error.code === 'P2002') {
            // 	return res.status(401).json({
            // 		emailError: 'A user with this email already exists'
            // 	});
            // }
            // res.status(500).json({ error, message: error.message });
        }
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email.toLowerCase()));
        if (!user) {
            return res.status(401).json({
                error: 'This email address is not registered',
                statusCode: 401
            });
        }
        const { passwordHash, ...rest } = user;
        const unhashedPassword = CryptoJS.AES.decrypt(passwordHash, process.env.PASSWORD_SECRET).toString(CryptoJS.enc.Utf8);
        if (password !== unhashedPassword) {
            return res.status(401).json({
                error: 'This password is incorrect',
                statusCode: 401
            });
        }
        else {
            //   const accessToken = jwt.sign(
            //     {
            //       id: rest.id,
            //       role: rest.role
            //     },
            //     process.env.JWT_SECRET!,
            //     { expiresIn: '30d' }
            //   );
            //   const accessToken = signJwt({ id: rest.id, role: rest.role });
            res
                // .cookie('access_token', accessToken, {
                //   httpOnly: false,
                //   secure: process.env.NODE_ENV === 'production',
                //   sameSite: 'none',
                //   domain: '.naijason.tech'
                // })
                .status(201)
                .json({
                user: rest
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};
function extractToken(req) {
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}
const me = async (req, res) => {
    //   const token = req?.headers?.cookie?.match(
    //     new RegExp('(^| )' + 'access_token' + '=([^;]+)')
    //   )?.[2];
    console.log('logout api');
    const { id } = req.body;
    try {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        // console.log(user);
        if (!user) {
            console.log('no user');
            return res
                .status(401)
                .json({ message: 'Email address is not registered' });
        }
        const { passwordHash, ...rest } = user;
        //   const accessToken = jwt.sign(
        //     {
        //       id: rest.id,
        //       role: rest.role
        //     },
        //     process.env.JWT_SECRET!,
        //     { expiresIn: '14d' }
        //   );
        console.log('authenticated');
        return res.status(201).json({ user: rest });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};
export { registerUser, loginUser, me };
//# sourceMappingURL=authController.js.map