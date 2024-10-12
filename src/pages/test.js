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

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': file.type, // Set the content type to the file type
          'file-name': file.name,     // Send the filename as a header
        },
        body: file, // Send the file directly
      });

      const result = await response.json();

      if (result.status) {
        setUploadStatus('File uploaded successfully!');
        setFileUrl(result.data.fileUrl); // Get the uploaded file's URL
      } else {
        setUploadStatus(`Error: ${result.message}`);
      }
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>File Upload</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
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
