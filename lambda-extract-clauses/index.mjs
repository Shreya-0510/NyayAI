import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { TextDecoder } from "util";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export const handler = async (event) => {
  console.log("Event:", JSON.stringify(event));

  try {
    const record = event.Records[0];
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

    // Step 1: Get file from S3
    const getObj = new GetObjectCommand({ Bucket: bucket, Key: key });
    const response = await s3.send(getObj);

    // Convert stream → text
    const body = await streamToString(response.Body);

    // Step 2: Extract "clauses" (customized for your document)
    // Split on lines or numbered headings
    const lines = body.split(/\n+/).map(s => s.trim()).filter(Boolean);

    // Include lines that contain keywords or numbered headings
    const clauses = lines.filter(line =>
      /\b(shall|must|agree|agrees|liable)\b/i.test(line) || /^[0-9]+\./.test(line)
    );

    // Step 3: Print extracted clauses to console
    console.log("Extracted Clauses:", clauses);

    return {
      statusCode: 200,
      body: `Extracted ${clauses.length} clauses (check CloudWatch logs)`,
    };

  } catch (err) {
    console.error("Error:", err);
    return { statusCode: 500, body: "Failed to extract clauses" };
  }
};

// Helper: stream → string
async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return new TextDecoder("utf-8").decode(Buffer.concat(chunks));
}
