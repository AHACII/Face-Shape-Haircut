import { FaceAnalysisResult } from '../types';
import { hairstyleSuggestions } from '../data/hairstyles';
import { Scissors, CheckCircle } from 'lucide-react';

interface FaceAnalysisProps {
  result: FaceAnalysisResult;
  onReset: () => void;
}

const faceShapeNames: Record<string, string> = {
  Round: 'مستدير',
  Square: 'مربع',
  Oval: 'بيضاوي',
  Heart: 'قلب',
  Oblong: 'مستطيل',
  Diamond: 'ماسي',
};

export default function FaceAnalysis({ result, onReset }: FaceAnalysisProps) {
  const suggestions = hairstyleSuggestions[result.shape];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              نتيجة التحليل
            </h2>
            <p className="text-gray-600">
              شكل الوجه: <span className="font-semibold text-blue-600 text-2xl">
                {faceShapeNames[result.shape]}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              دقة التحليل: {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Scissors className="w-8 h-8 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-900">
            تسريحات مقترحة
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((style, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {style.name}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {style.description}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onReset}
          className="mt-8 w-full bg-gray-700 hover:bg-gray-800 text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all"
        >
          تحليل زبون آخر
        </button>
      </div>
    </div>
  );
}
