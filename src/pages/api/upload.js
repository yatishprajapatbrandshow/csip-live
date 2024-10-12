// pages/api/upload.js

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export default async function handler(req, res) {
    console.log(req.body);
    
    if (req.method !== 'POST') {
        return res.status(405).json({ status: false, message: 'Method Not Allowed', data: false });
    }

    const { fileName, fileType } = req.body; // The file information comes from the client

    const bucket = 'csipcontent';
    const key = `img/content/${fileName}`;
    const region = 'blr1';
    const endpoint = 'https://csipcontent.blr1.digitaloceanspaces.com'; // Space origin URL
    const accessKeyId = 'DO00GDP78XUCFGCYBR3P'; // Replace with your actual access key
    const secretAccessKey = 'zL0CvU2FTCmiejqW5+9BN/WZQP0B3J6Eu6PXZUYS1ew'; // Replace with your actual secret key

    const s3Client = new S3Client({
        region,
        endpoint,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
        forcePathStyle: true,
    });

    try {
        const uploadParams = {
            Bucket: bucket,
            Key: key,
            Body: Buffer.from(req.body.file, 'base64'), // Get the file content from the request
            ContentType: fileType,
            ACL: 'public-read',
        };

        const result = await s3Client.send(new PutObjectCommand(uploadParams));

        const fileUrl = `${endpoint}/${key}`;
        const finalUrl = fileUrl.replace(/([^:]\/)\/+/g, '$1'); // Clean URL

        res.status(200).json({ status: true, message: "File Uploaded", data: { fileUrl: finalUrl } });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message, data: false });
    }
}
