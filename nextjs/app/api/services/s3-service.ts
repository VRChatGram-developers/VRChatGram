import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;
  private region: string;

  constructor() {
    const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET_NAME } = process.env;

    if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION || !S3_BUCKET_NAME) {
      throw new Error("AWS S3 の環境変数が適切に設定されていません");
    }
   
    this.s3Client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });

    this.bucketName = S3_BUCKET_NAME;
    this.region = AWS_REGION;
  }

  uploadFileToS3 = async (file: string, fileName: string): Promise<string> => {
    try {
      const base64Data = file.split(",")[1];
      const buffer = Buffer.from(base64Data, "base64");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const uploadParams: any = {
        Bucket: this.bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: "image/png",
        ACL: "public-read",
      };

      const command = new PutObjectCommand(uploadParams);
      await this.s3Client.send(command);

      const imageUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
      return imageUrl;
    } catch (err) {
      throw new Error(`画像のアップロードに失敗しました: ${err}`);
    }
  };
}
