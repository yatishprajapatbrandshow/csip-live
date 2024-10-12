import { useState } from 'react';

const Home = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [fileUrl, setFileUrl] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    
    const handleUpload = async () => {
        if (!file) {
            setUploadStatus('Please select a file first.');
            return;
        }
        console.log(file);
        
        const formData = new FormData();
        formData.append('fileUp', file); // Append the file to the form data
    
        for (const [key, value] of formData.entries()) {
            console.log(key, value); // This will log the key-value pairs in the FormData
        }
    
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData, // Send the FormData object
            });
    
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.log("error here", error);
        }
    };
    
    return (
        <div style={{ padding: '20px' }}>
            <h1>File Upload</h1>
            <input type="file" name="fileUp" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
                Upload File
            </button>
            <p>{uploadStatus}</p>
            {fileUrl && (
                <div>
                    <p>File URL: {fileUrl}</p>
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                        View Uploaded File
                    </a>
                </div>
            )}
        </div>
    );
};

export default Home;
