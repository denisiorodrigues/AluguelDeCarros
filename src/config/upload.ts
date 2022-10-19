import multer from "multer";
import crypto from "crypto";
import { resolve } from "path";

export default {
    upload(folder: string) {
        const path = resolve(__dirname, "..", "..", folder);
        return {
            storage : multer.diskStorage({
                destination: path,
                filename : (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash} - ${file.originalname}`;
                    
                    return callback(null, fileName);
                }
            }),
        };
    }
}