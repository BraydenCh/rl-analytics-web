"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReplayUpload() {
  // Upload State
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // History State
  const [uploads, setUploads] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Fetch upload history
  const fetchUploadHistory = async () => {
    try {
      setLoadingHistory(true);
      const res = await fetch('http://localhost:8000/user_uploads', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setUploads(data.matches || []);
      }
    } catch (error) {
      console.error("Failed to fetch upload history:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Load history on mount
  useEffect(() => {
    fetchUploadHistory();
  }, []);

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
      const response = await fetch(`http://localhost:8000/upload_replay`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      setStatus('success');
      setMessage('Replay uploaded successfully!');
      setFile(null); // Clear the input after success
      
      // Refresh the table to show the new upload immediately
      fetchUploadHistory();
      
    } catch (error) {
      console.error('Error uploading replay:', error);
      setStatus('error');
      setMessage('Failed to upload the replay. Please try again.');
    }
  };

  const handleDelete = async (matchId: string) => {
    // Placeholder for future delete functionality
    if (confirm("Are you sure you want to delete this replay?")) {
      console.log(`Delete requested for ${matchId}`);
      // await fetch(...DELETE endpoint...)
      // fetchUploadHistory();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gray-900 text-white font-sans">
      
      {/* ================= HEADER ================= */}
      <div className="w-full max-w-4xl mb-8">
        <h1 className="text-4xl font-extrabold text-white">Upload Hub</h1>
        <p className="text-gray-400 mt-2">Upload new replays and manage your submission history.</p>
      </div>

      {/* ================= UPLOAD BOX ================= */}
      <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-xl border border-gray-700 shadow-xl mb-12">
        <h2 className="mb-6 text-2xl font-bold text-white">Submit New Replay</h2>
        
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Select .replay file
          </label>
          <input
            type="file"
            accept=".replay"
            onChange={handleFileChange}
            className="w-full px-4 py-3 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-gray-700 file:text-white hover:file:bg-gray-600"
            disabled={status === 'uploading'}
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || status === 'uploading'}
          className={`w-full px-4 py-3 font-bold text-white rounded-lg focus:outline-none transition-all ${
            !file || status === 'uploading'
              ? 'bg-indigo-900/50 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg transform hover:scale-[1.01]'
          }`}
        >
          {status === 'uploading' ? 'Processing Upload...' : 'Submit Replay'}
        </button>

        {message && (
          <div
            className={`mt-4 p-4 rounded-lg text-sm font-bold text-center border ${
              status === 'error' 
                ? 'bg-red-900/30 border-red-900 text-red-400' 
                : 'bg-green-900/30 border-green-900 text-green-400'
            }`}
          >
            {message}
          </div>
        )}
      </div>

      {/* ================= UPLOAD HISTORY TABLE ================= */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-white mb-6">Your Upload History</h2>
        
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          {loadingHistory ? (
            <div className="p-8 text-center text-gray-400">Loading your uploads...</div>
          ) : uploads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              You haven't uploaded any replays yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-900/50 text-gray-400 text-sm uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Match Details</th>
                    <th className="px-6 py-4 font-semibold text-center">Score</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {uploads.map((match: any) => (
                    <tr key={match.id} className="hover:bg-gray-700/30 transition-colors">
                      
                      {/* Name & Date */}
                      <td className="px-6 py-4">
                        <Link href={`/match/${match.id}`} className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline block truncate max-w-xs" title={match.name}>
                          {match.name || 'Unnamed Replay'}
                        </Link>
                        <span className="text-xs text-gray-500">
                          {new Date(match.created_at).toLocaleString()}
                        </span>
                      </td>

                      {/* Scoreline */}
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-blue-400">{match.team_0_score}</span>
                        <span className="text-gray-600 mx-2">-</span>
                        <span className="font-bold text-orange-400">{match.team_1_score}</span>
                      </td>

                      {/* Delete Action */}
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDelete(match.id)}
                          className="text-red-500 hover:text-red-400 text-sm font-bold bg-red-900/20 hover:bg-red-900/40 px-3 py-1.5 rounded transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}