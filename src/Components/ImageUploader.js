import { Clipboard } from 'lucide-react';
import React, { useState, useCallback } from 'react';

export default function ImageUploader() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null); // Store uploaded URL
    const [finalUrl, setFinalUrl] = useState(null); // Store modified URL

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleFileChange = useCallback((e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }, []);

    const handleUpload = useCallback(async () => {
        if (file) {
            const formData = new FormData();
            formData.append('fileUp', file); // Append the file to the form data

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData, // Send the FormData object
                });

                const result = await response.json();
                const originalUrl = result?.data?.fileUrl;

                // Modify the URL by adding '/csip-image/' after the domain
                const modifiedUrl = originalUrl.replace(
                    'https://csip-image.blr1.digitaloceanspaces.com/',
                    'https://csip-image.blr1.digitaloceanspaces.com/csip-image/'
                );

                setUploadedUrl(originalUrl); // Store original URL
                setFinalUrl(modifiedUrl); // Store modified URL
                setFile(null);
            } catch (error) {
                console.log("Error uploading image:", error);
            }
        }
    }, [file]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        });
    };

    const getEmbedCode = (url, name) => {
        return `<img src="${url}" alt="EmbedImage"/>`;
    };

    return (
        <div className="">
            {/* Button to open dialog */}
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsOpen(true)}
            >
                Upload Image
            </button>

            {/* Dialog (Modal) */}
            {isOpen && (
                <div className="fixed inset-0  flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                        <h2 className="text-lg font-semibold mb-4">Upload Image</h2>

                        {/* Drag & Drop Area */}
                        <div
                            className={`border-2 border-dashed rounded-lg p-4 text-center ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                }`}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            {file ? (
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600">{file.name}</p>
                                </div>
                            ) : (
                                <>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Drag and drop your image here, or click to select
                                    </p>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="inline-block mt-4 px-4 py-2 border border-gray-300 rounded-md cursor-pointer text-sm font-medium text-gray-700"
                                    >
                                        Select File
                                    </label>
                                </>
                            )}
                        </div>

                        {/* Upload Button */}
                        <button
                            onClick={handleUpload}
                            disabled={!file}
                            className={`mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${!file ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            Upload
                        </button>

                        {/* Uploaded URL Section */}
                        {finalUrl && (
                            <div className="mt-4">
                                <p className="text-md text-gray-600 flex justify-between px-2">Final URL: <button
                                    onClick={() => copyToClipboard(finalUrl)}
                                    className="text-gray-600 font-bold py-1 rounded"
                                >
                                    <Clipboard />
                                </button>
                                </p>
                                <div className="flex items-center mb-10">
                                    <input
                                        type="text"
                                        value={finalUrl}
                                        readOnly
                                        className="border rounded-md p-2 text-gray-700 w-full mr-2"
                                    />
                                </div>

                                <p className="text-md text-gray-600 flex justify-between px-2">Embed Code: <button
                                    onClick={() => copyToClipboard(getEmbedCode(finalUrl))}
                                    className="text-gray-600 font-bold py-1 rounded"
                                >
                                    <Clipboard />
                                </button>
                                </p>
                                <div className="">
                                    <textarea
                                        type="text"
                                        value={getEmbedCode(finalUrl)}
                                        readOnly
                                        className="border rounded-md p-2 text-gray-700 w-full mr-2 h-40"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
