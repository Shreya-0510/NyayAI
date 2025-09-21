import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config()

const s3 = new S3Client({ region: process.env.AWS_REGION });
const BUCKET = process.env.AWS_BUCKET_NAME;

export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
  };

  // Preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    const { fileName, fileType } = JSON.parse(event.body);

    // Create presigned URL using v3 style
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: fileName,
      ContentType: fileType,
    });

    const uploadURL = await getSignedUrl(s3, command, { expiresIn: 60 });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ uploadUrl: uploadURL }),
    };
  } catch (err) {
    console.error("Lambda error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Could not generate upload URL" }),
    };
  }
};
