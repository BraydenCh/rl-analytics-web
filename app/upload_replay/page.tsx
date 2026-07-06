"use client";
import React, { useState } from 'react';

export default function ReplayUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus('uploading');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Ensure the endpoint path matches your actual routing
      const response = await fetch(`http://localhost:8000/upload_replay`, {
        method: 'POST',
        // If your API requires auth headers, add them here:
        // headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      setStatus('success');
      setMessage('Replay uploaded successfully!');
      setFile(null); // Clear the input after success
      
    } catch (error) {
      console.error('Error uploading replay:', error);
      setStatus('error');
      setMessage('Failed to upload the replay. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Upload Replay
        </h1>
        
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select file
          </label>
          <input
            type="file"
            accept=".replay"
            onChange={handleFileChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            disabled={status === 'uploading'}
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || status === 'uploading'}
          className={`w-full px-4 py-2 font-bold text-white rounded-lg focus:outline-none focus:shadow-outline transition-colors ${
            !file || status === 'uploading'
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {status === 'uploading' ? 'Uploading...' : 'Submit Replay'}
        </button>

        {message && (
          <div
            className={`mt-4 p-3 rounded text-sm text-center ${
              status === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}