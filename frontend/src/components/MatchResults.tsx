import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { apiService } from '../services/api';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { Alert } from './common/Alert';

export function MatchResults() {
  const {
    currentJob,
    candidates,
    matchResults,
    setMatchResults,
    setEvaluationResults,
    setLoading,
    loading,
    error,
    setError,
  } = useAppContext();
  const [showEvaluate, setShowEvaluate] = useState(false);

  const handleMatch = async () => {
    if (!currentJob) {
      setError('Please create a job first');
      return;
    }

    if (candidates.length === 0) {
      setError('Please upload at least one CV');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const results = await apiService.matchCandidates(currentJob.job_id);
      setMatchResults(results);
      setShowEvaluate(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to match candidates');
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluate = async () => {
    if (!currentJob || !matchResults) {
      setError('Match results not available');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const evaluations = await apiService.evaluateCandidates(
        currentJob.job_id,
        currentJob.title,
        currentJob.description,
        matchResults.results.map((r) => ({
          candidate_id: r.candidate_id,
          score: r.score,
        }))
      );
      setEvaluationResults(evaluations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to evaluate candidates');
    } finally {
      setLoading(false);
    }
  };

  if (!currentJob || candidates.length === 0) {
    return (
      <Card>
        <p className="text-gray-600">Create a job and upload CVs to see matching results.</p>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Candidate Matching</h2>
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      {!matchResults ? (
        <Button onClick={handleMatch} isLoading={loading}>
          Match Candidates
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Candidate</th>
                  <th className="text-right py-2 px-2">Match Score</th>
                </tr>
              </thead>
              <tbody>
                {matchResults.results.map((result) => (
                  <tr key={result.candidate_id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2">{result.filename}</td>
                    <td className="text-right py-2 px-2">
                      <span className="font-bold text-lg">{result.score.toFixed(1)}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showEvaluate && currentJob && (
            <Button onClick={handleEvaluate} isLoading={loading}>
              Get AI Evaluation
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
