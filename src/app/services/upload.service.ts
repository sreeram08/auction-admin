import { Injectable } from '@angular/core';
// import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  uploadAuctionImage(file) {
    return new Promise(resolve => {

      const contentType = file.type;
      const bucket = new S3(
        {
          accessKeyId: 'AKIAQ55DI7XA55YHOIVK',
          secretAccessKey: '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',
          region: 'ap-south-1'
        }
      );
      const params = {
        Bucket: 'conferro-heritae',
        Key: "auction-poster/" + new Date + file.name,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType
      };
      bucket.upload(params, function (err, data) {
        if (err) {
          console.log('There was an error uploading your file: ', err);
          resolve(false);
        }
        console.log('Successfully uploaded file.', data);
        resolve(data.Location);
      });
      //for upload progress   
      /*bucket.upload(params).on('httpUploadProgress', function (evt) {
                console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
            }).send(function (err, data) {
                if (err) {
                    console.log('There was an error uploading your file: ', err);
                    return false;
                }
                console.log('Successfully uploaded file.', data);
                return true;
            });*/
    })
  }
}
