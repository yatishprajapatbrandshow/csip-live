import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ status: false, message: 'Method Not Allowed', data: false });
    }

    return res.status(200).json({ status: false, message: 'Method Not Allowed', data: false });

    
}
