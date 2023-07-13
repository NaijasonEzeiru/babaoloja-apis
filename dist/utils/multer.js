import { diskStorage } from 'multer';
import path from 'path';
var storage = diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, '/uploads/'));
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
export default storage;
//# sourceMappingURL=multer.js.map