import { unlink } from 'fs';
import cloudinary from '../utils/cloudinary.js';
import { eq } from 'drizzle-orm';
import CryptoJS from 'crypto-js';
import { config } from 'dotenv';
import { promisify } from 'util';
import { users } from '../db/schema/schema.js';
import { db } from '../db/db.js';
config();
const unlinkAsync = promisify(unlink);
export const getUser = async (req, res) => {
    try {
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.id, req.params.id));
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json({ err, message: 'User not found' });
    }
};
export const updateUser = async (req, res) => {
    // TODO: authenticate route
    console.log(req.body);
    let { email, lastName, firstName, phone, displayImg } = req.body;
    console.log(req.params.id);
    try {
        if (req.body?.newImg) {
            // Submit to cloudinary
            console.log(req.body.newImg);
            displayImg = await cloudinary.uploader.upload(req.file.path, {
                upload_preset: 'ecomm'
            });
            await unlinkAsync(req.file.path);
            // delete from cloudinary
        }
        const [updatedUser] = await db
            .update(users)
            .set({ email, lastName, firstName, displayImg, phone })
            .where(eq(users.id, req.params.id))
            .returning({
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
            displayImg: users.displayImg,
            phone: users.phone,
            email: users.email
        });
        console.log(updatedUser);
        res.status(201).json(updatedUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err, message: 'Operation failed' });
    }
};
export const updatePassword = async (req, res) => {
    //TODO: Validate and authenticate
    // const {password, confirmPassword}  = req.body
    console.log(req.body);
    if (req.body?.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString();
        console.log(req.body.password);
        try {
            const [updatedUser] = await db
                .update(users)
                .set({ passwordHash: req.body.password })
                .where(eq(users.id, req.params.id))
                .returning({ updatedPassword: users.passwordHash });
            // const unhashedPassword = CryptoJS.AES.decrypt(
            //   passwordHash,
            //   process.env.PASSWORD_SECRET!
            // ).toString(CryptoJS.enc.Utf8);
            const hi = await JSON.stringify(updateUser);
            console.log(hi);
            res.status(201).json(updatedUser);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err, message: 'Operation failed' });
        }
    }
};
//# sourceMappingURL=usersController.js.map