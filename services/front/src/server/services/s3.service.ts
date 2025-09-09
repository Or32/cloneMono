import { s3Client } from "@/lib/clients/s3.client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export class S3Service {
  static async uploadFile(req:{file: File, fileName: string}) {
    const bucket = "latte-bucket-poc";

    const arrayBuffer = await req.file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: req.fileName,
        Body: buffer,
        ContentType: req.file.type,
      })
    );

    return `s3://${bucket}/${req.fileName}`;
  }
}
