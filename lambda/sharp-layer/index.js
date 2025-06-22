const AWS = require("aws-sdk");
const sharp = require("sharp");
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const record = event.Records[0];
  const bucket = record.s3.bucket.name;
  const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

  if (!key.startsWith("originals/")) {
    console.log("Not in originals/ folder");
    return;
  }

  try {
    const originalImage = await s3.getObject({ Bucket: bucket, Key: key }).promise();

    const webpImage = await sharp(originalImage.Body).webp({ quality: 80 }).toBuffer();

    const webpKey = key.replace(/^originals\//, "webp/").replace(/\.\w+$/, ".webp");

    await s3
      .putObject({
        Bucket: bucket,
        Key: webpKey,
        Body: webpImage,
        ContentType: "image/webp",
      })
      .promise();

    console.log(`Converted and saved: ${webpKey}`);
  } catch (err) {
    console.error("Error processing file:", err);
  }
};
