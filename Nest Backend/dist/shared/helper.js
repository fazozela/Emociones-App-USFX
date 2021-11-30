"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
class Helper {
    static customFileName(req, file, cb) {
        file.originalname = 'video1';
        let customFile = file.originalname.split('.')[0];
        let fileExtension = '';
        if (file.mimetype.indexOf('mp4') > -1) {
            fileExtension = '.mp4';
        }
        customFile = customFile + fileExtension;
        cb(null, customFile);
    }
    static filePath(req, file, cb) {
        cb(null, './images/');
    }
}
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map