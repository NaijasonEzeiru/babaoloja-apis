import { diskStorage } from 'multer';

const storage = diskStorage({
	destination(req, file, callback) {
		callback(null, './uploads/');
	},
	filename: function (req, file, callback) {
		callback(null, Date.now() + file.originalname);
	}
});

export default storage;
