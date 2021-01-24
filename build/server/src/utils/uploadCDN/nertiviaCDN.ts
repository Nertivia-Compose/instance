import request from 'request';
import config from '../../config';

export function uploadFile(BufferOrStream: any, userid: string, fileid: string, filename: string, isEmoji?: Boolean) {
  return new Promise((resolve, reject) => {

    const options: request.Options = {
      url: `${process.env.VUE_APP_CDN_DOMAIN}/${process.env.VUE_APP_IMAGE_UPLOAD_FILE}`,
      formData: {
        secret: config.fileCDNSecret,
        userid: userid || "",
        fileid: fileid || "",
        isemoji: isEmoji ? "1" : "0",
        fileToUpload:{
          value:  BufferOrStream,
          options: {
            filename: filename
          }
        }
      }
    }
    request.post(options, (err, response, body) => {
      if (err || response.statusCode !== 200) return reject(err || body);
      resolve(true);
    })
  })
}

export function deletePath(path: string) {
  return new Promise((resolve, reject) => {
    const options: request.Options = {
      url: `${process.env.VUE_APP_CDN_DOMAIN}/${process.env.VUE_APP_IMAGE_DELETE_FILE}`,
      json: {
        secret: config.fileCDNSecret,
        removePath: path
      }
    }
    request.delete(options, (err, response, body) => {
      if (err || response.statusCode !== 200) return reject(err || body);
      resolve(body);
    })
  })
}