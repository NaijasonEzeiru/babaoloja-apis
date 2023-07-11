import { diskStorage } from 'multer';
var storage = diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
export default storage;
//# sourceMappingURL=multer.js.map