import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const CertificatePage = () => {
    const canvasRef = useRef(null);
    const router = useRouter();
    const { id } = router.query;
    const [certificateData, setCertificateData] = useState(null);

    useEffect(() => {
        // Fetch certificate data using the ID
        const fetchCertificateData = async () => {
            try {
                const response = await fetch(`/api/getCertificateData?id=${id}`);
                const data = await response.json();
                setCertificateData(data);
            } catch (error) {
                console.error('Error fetching certificate data:', error);
            }
        };

        if (id) {
            fetchCertificateData();
        }
    }, [id]);

    useEffect(() => {
        if (certificateData) {
            generateCertificate();
        }
    }, [certificateData]);

    const generateCertificate = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const background = new Image();

        canvas.width = 1200;
        canvas.height = 932;

        // Set the background image
        background.src = certificateData.achivremark !== '' ? '../images/certificate.webp' : '../images/warning.jpg';
        background.onload = function () {
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            // Add certificate text and data
            ctx.font = '20px Arial';
            ctx.fillStyle = '#5E6265';
            ctx.fillText(`NMO ID: ${certificateData.achivnmoid}`, 826, 332);

            ctx.font = '42px Arial';
            ctx.fillStyle = '#000';
            ctx.fillText(`${certificateData.achiv_name}`, 114, 423);

            ctx.font = '30px Arial';
            ctx.fillStyle = '#5f6164';
            ctx.fillText(`${certificateData.achivtext}`, 218, 598);

            ctx.font = '20px Arial';
            ctx.fillStyle = '#707476';
            ctx.fillText(`${certificateData.achivcode}`, 898, 290);
            ctx.fillText(`${certificateData.achivdate}`, 920, 225);

            // Optional QR Code drawing logic here (as in your PHP example)
        };
    };

    const downloadCertificate = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'certificate.jpg';
        link.href = canvas.toDataURL('image/jpg');
        link.click();
    };

    return (
        <div>
            <h1>Achievement Certificate</h1>
            <canvas id="canvas" ref={canvasRef}></canvas>
            <button onClick={downloadCertificate}>Download Certificate</button>
        </div>
    );
};

export default CertificatePage;
