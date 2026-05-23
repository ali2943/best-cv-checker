import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { apiService } from '../services/api';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { Alert } from './common/Alert';

export function JobForm() {
  const { setCurrentJob, setLoading, loading, error, setError } = useAppContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !description.trim()) {
      setError('Job title and description are required');
      return;
    }

    setLoading(true);
    try {
      const jobResponse = await apiService.createJob(title, description);
      setCurrentJob({
        job_id: jobResponse.job_id,
        title: jobResponse.title,
        description,
      });
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Create Job Description</h2>
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Senior Python Engineer"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Job Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the job requirements, skills needed, experience level..."
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <Button type="submit" isLoading={loading}>
          Create Job
        </Button>
      </form>
    </Card>
  );
}
