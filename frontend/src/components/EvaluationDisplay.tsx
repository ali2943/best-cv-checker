import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Card } from './common/Card';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';

export function EvaluationDisplay() {
  const { evaluationResults } = useAppContext();

  if (!evaluationResults) {
    return null;
  }

  const recommended = evaluationResults.evaluations.find(
    (e) => e.candidate_id === evaluationResults.recommended_candidate_id
  );

  return (
    <div className="space-y-6">
      {recommended && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
          <div className="flex items-start gap-4">
            <FiCheck className="text-3xl text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2">Recommended Candidate</h3>
              <p className="text-lg font-semibold mb-3">{recommended.filename}</p>
              <p className="text-gray-700 mb-4">{evaluationResults.reasoning}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Match Score</p>
                  <p className="text-2xl font-bold text-blue-600">{recommended.match_score.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Recommendation</p>
                  <p className="text-lg font-bold text-green-600">{evaluationResults.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div>
        <h3 className="text-xl font-bold mb-4">Detailed Evaluations</h3>
        <div className="space-y-4">
          {evaluationResults.evaluations.map((evalItem) => (
            <Card key={evalItem.candidate_id}>
              <h4 className="text-lg font-bold mb-4">{evalItem.filename}</h4>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Technical Suitability</p>
                  <p className="text-sm">{evalItem.technical_suitability}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Experience Quality</p>
                  <p className="text-sm">{evalItem.experience_quality}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Project Relevance</p>
                  <p className="text-sm">{evalItem.project_relevance}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Communication</p>
                  <p className="text-sm">{evalItem.communication}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-600 font-medium">Growth Potential</p>
                <p className="text-sm">{evalItem.growth_potential}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-semibold text-green-600 mb-2">Strengths</p>
                  <ul className="space-y-1">
                    {evalItem.strengths.map((strength, i) => (
                      <li key={i} className="text-xs flex items-start gap-2">
                        <FiCheck className="flex-shrink-0 text-green-600" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-orange-600 mb-2">Areas for Growth</p>
                  <ul className="space-y-1">
                    {evalItem.weaknesses.map((weakness, i) => (
                      <li key={i} className="text-xs flex items-start gap-2">
                        <FiAlertCircle className="flex-shrink-0 text-orange-600" />
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <p className="text-xs text-gray-600 font-medium mb-1">Overall Assessment</p>
                <p className="text-sm">{evalItem.overall_assessment}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
