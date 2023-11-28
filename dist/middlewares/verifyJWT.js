import { verifyJWT } from '../utils/verifyToken.js';
export const verifyToken = async (req, res, next) => {
    const token = req?.headers?.cookie?.match(new RegExp('(^| )' + 'token' + '=([^;]+)'))?.[2];
    console.log(token);
    if (!token) {
        return res.status(403).json({
            message: 'Unauthorised',
            isLoggedIn: false
        });
    }
    try {
        const decodedToken = await verifyJWT(token);
        if (!decodedToken?.id) {
            return res.status(403).json('failed to authenticate');
        }
        //@ts-expect-error
        req.user = decodedToken;
        next();
    }
    catch (err) {
        return res.status(403).json('failed to authenticate');
    }
    //   jwt.verify(token, process.env.JWT_SECRET, (err: {} | null, user) => {
    //     if (err) res.status(403).json('failed to authenticate');
    //     req.user = user;
    //     next();
    //   });
};
export const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        //@ts-expect-error
        if (req.user.id == req.params.id || req.user.role === 'admin') {
            next();
        }
        else {
            res.status(403).json('You are not authorised for this action');
        }
    });
};
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        //@ts-expect-error
        if (req.user.role === 'admin') {
            next();
        }
        else {
            res.status(403).json('You are not authorised for this action');
        }
    });
};
//# sourceMappingURL=verifyJWT.js.map