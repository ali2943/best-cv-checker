import React, { useEffect, useState } from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import { apiService } from './services/api';
import { JobForm } from './components/JobForm';
import { CVUpload } from './components/CVUpload';
import { MatchResults } from './components/MatchResults';
import { EvaluationDisplay } from './components/EvaluationDisplay';
import { Alert } from './components/common/Alert';
import { FiBriefcase } from 'react-icons/fi';

function AppContent() {
  const { currentJob, candidates, evaluationResults, error, setError } = useAppContext();
  const [isHealthy, setIsHealthy] = useState(false);

  useEffect(() => {
    apiService.health()
      .then(() => setIsHealthy(true))
      .catch(() => setError('Backend API is not available'));
  }, [setError]);

  if (!isHealthy) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Alert type="error" message="Cannot connect to backend API. Make sure the server is running on http://localhost:8000" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <FiBriefcase className="text-3xl text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">CV Checker AI</h1>
          </div>
          <p className="text-gray-600 mt-2">AI-powered resume matching and evaluation system</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <JobForm />
          <CVUpload />
        </div>

        {currentJob && candidates.length > 0 && <MatchResults />}

        {evaluationResults && <EvaluationDisplay />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
