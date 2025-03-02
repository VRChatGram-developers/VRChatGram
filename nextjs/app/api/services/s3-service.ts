import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;
  private region: string;

  constructor() {
    const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION, S3_BUCKET_NAME } = process.env;

    if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !REGION || !S3_BUCKET_NAME) {
      throw new Error("AWS S3 の環境変数が適切に設定されていません");
    }

    console.log(`ACCESS_KEY_ID: ${ACCESS_KEY_ID}`);
    console.log(`SECRET_ACCESS_KEY: ${SECRET_ACCESS_KEY}`);
    console.log(`REGION: ${REGION}`);
    console.log(`S3_BUCKET_NAME: ${S3_BUCKET_NAME}`);

    this.s3Client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });

    this.bucketName = S3_BUCKET_NAME;
    this.region = REGION;
  }

  uploadFileToS3 = async (file: string, fileName: string): Promise<string> => {
    try {
      // File オブジェクトから Buffer に変換
      const base64Data = file.split(',')[1]; // `data:image/png;base64,`を取り除く
      const buffer = Buffer.from(base64Data, 'base64'); 

      console.log(`bucketName: ${this.s3Client}`);

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

      // アップロードされたファイルの URL を生成
      const imageUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
      return imageUrl;
    } catch (err) {
      throw new Error(`画像のアップロードに失敗しました: ${err}`);
    }
  };
}
