import { IncomingForm } from 'formidable'; // Updated import statement
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs'; // Import fs to read the file buffer

// Enable API to handle large file uploads
export const config = {
    api: {
        bodyParser: false, // Disable the default body parsing
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ status: false, message: 'Method Not Allowed', data: false });
    }

    // Parse the incoming form data
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing the files:', err);
            return res.status(500).json({ status: false, message: 'Error parsing the files', data: false });
        }

        console.log('Fields:', fields); // Log non-file fields
        console.log('Files:', files); // Log the uploaded files

        const fileArray = files.fileUp; // Access the uploaded file array
        if (!fileArray || fileArray.length === 0) {
            console.error('No file uploaded or incorrect field name.');
            return res.status(400).json({ status: false, message: 'No file uploaded or incorrect field name.', data: false });
        }

        const file = fileArray[0]; // Access the first file in the array
        const fileName = file.originalFilename; // Use originalFilename for the file name
        const filePath = file.filepath; // Get the file path

        if (!filePath) {
            console.error('File path is undefined.');
            return res.status(400).json({ status: false, message: 'File path is undefined.', data: false });
        }

        const bucket = 'csip-image';
        const region = 'blr1';
        const endpoint = 'https://csip-image.blr1.digitaloceanspaces.com';
        const accessKeyId = 'DO00GDP78XUCFGCYBR3P'; // Replace with your actual access key
        const secretAccessKey = 'zL0CvU2FTCmiejqW5+9BN/WZQP0B3J6Eu6PXZUYS1ew'; 

        const key = `img/content/${fileName}`;

        // Create S3 Client
        const s3Client = new S3Client({
            region,
            endpoint,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
            forcePathStyle: true,
        });

        // Read the file into a buffer
        const fileBuffer = fs.readFileSync(filePath); // Read the file as a buffer

        const uploadParams = {
            Bucket: bucket,
            Key: key,
            Body: fileBuffer, // Use the buffer directly
            ContentType: file.mimetype, // Use the correct content type
            ACL: 'public-read',
        };

        try {
            const result = await s3Client.send(new PutObjectCommand(uploadParams));
            const fileUrl = `${endpoint}/${key}`;
            const finalUrl = fileUrl.replace(/([^:]\/)\/+/g, '$1'); // Clean URL

            res.status(200).json({ status: true, message: "File Uploaded", data: { fileUrl: finalUrl } });
        } catch (error) {
            console.error('Error uploading to S3:', error);
            res.status(500).json({ status: false, message: error.message, data: false });
        }
    });
}
