import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { apiService } from '../services/api';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { Alert } from './common/Alert';
import { FiUpload } from 'react-icons/fi';

export function CVUpload() {
  const { candidates, setCandidates, setLoading, loading, error, setError } = useAppContext();
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []).filter((file) =>
      ['.pdf', '.docx'].some((ext) => file.name.toLowerCase().endsWith(ext))
    );
    if (selected.length !== (e.target.files?.length || 0)) {
      setError('Only PDF and DOCX files are supported');
    }
    setFiles([...files, ...selected]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select at least one file');
      return;
    }

    setError(null);
    setLoading(true);
    const newCandidates = [...candidates];

    try {
      for (const file of files) {
        const candidate = await apiService.uploadCV(file);
        newCandidates.push(candidate);
      }
      setCandidates(newCandidates);
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload CV');
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Upload Candidate CVs</h2>
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      <div className="space-y-4">
        <div
          className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:bg-blue-50"
          onClick={() => fileInputRef.current?.click()}
        >
          <FiUpload className="mx-auto mb-2 text-2xl text-blue-600" />
          <p className="text-gray-700">Click to upload CV (PDF or DOCX)</p>
          <p className="text-sm text-gray-500">You can select multiple files</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <p className="font-medium">Selected files:</p>
            {files.map((file, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <span className="text-sm">{file.name}</span>
                <button
                  onClick={() => removeFile(i)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <Button onClick={handleUpload} isLoading={loading}>
              Upload {files.length} {files.length === 1 ? 'CV' : 'CVs'}
            </Button>
          </div>
        )}

        {candidates.length > 0 && (
          <div className="mt-6">
            <p className="font-medium mb-3">Uploaded candidates:</p>
            <div className="space-y-2">
              {candidates.map((candidate) => (
                <div key={candidate.candidate_id} className="bg-green-50 border border-green-200 p-3 rounded">
                  <p className="text-sm font-medium">{candidate.filename}</p>
                  <p className="text-xs text-gray-500">{candidate.text_length} characters</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
