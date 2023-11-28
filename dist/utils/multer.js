import { diskStorage } from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = diskStorage({
    destination(req, file, callback) {
        callback(null, path.join(__dirname, '/uploads/'));
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
export default storage;
//# sourceMappingURL=multer.js.map