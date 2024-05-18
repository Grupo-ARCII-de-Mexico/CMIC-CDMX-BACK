import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
@Injectable()
export class S3Service {
  private s3;
  constructor(private config:ConfigService){
         // Configurar AWS SDK
         AWS.config.update({
            accessKeyId: this.config.get('AWS_ACCESS'),
            secretAccessKey: this.config.get('AWS_SECRET'),
            region:this.config.get('AWS_ZONE'),
        });
        this.s3 = new AWS.S3();
  }
  async uploadFile(buffer: any, url:string): Promise<{file:string}> {
    try {
      const params: AWS.S3.PutObjectRequest = {
        Bucket: this.config.get('AWSBUCKET'),
        Key: `${url}`,
        Body: buffer,
        ACL: 'public-read',
      };
      const upload: ManagedUpload.SendData = await this.s3.upload(params).promise();
      
      return {file:upload.Location};
    } catch (error) {
      console.log('Error uploading file to S3:', error);
      console.error('Error uploading file to S3:', error);
      throw new InternalServerErrorException('Error uploading file to S3');
    }
  }
  async deleteFile(url:string): Promise<void> {
    try {
      console.log(url);
      
      const params: AWS.S3.DeleteObjectRequest = {
        Bucket: this.config.get('AWSBUCKET'),
        Key: `${url}`,
      };

      await this.s3.deleteObject(params).promise();
    } catch (error) {
      console.error('Error deleting file from S3:', error);
      throw new InternalServerErrorException('Error deleting file from S3');
    }
  }

  async deleteByPrefix(prefix: string): Promise<void> {
    try {
      const listObjectsParams: AWS.S3.ListObjectsV2Request = {
        Bucket: this.config.get('AWSBUCKET'),
        Prefix: prefix,
      };
  
      const objects = await this.s3.listObjectsV2(listObjectsParams).promise();
  
      if (objects.Contents && objects.Contents.length > 0) {
        const deleteObjectsParams: AWS.S3.DeleteObjectsRequest = {
          Bucket: this.config.get('AWSBUCKET'),
          Delete: {
            Objects: objects.Contents.map(obj => ({ Key: obj.Key })),
          },
        };
  
        await this.s3.deleteObjects(deleteObjectsParams).promise();
  
        console.log(`Objetos eliminados con prefijo ${prefix}`);
      } else {
        console.log(`No se encontraron objetos con prefijo ${prefix}`);
      }
    } catch (error) {
      console.error('Error al eliminar objetos:', error);
      throw error;
    }
  }

}
