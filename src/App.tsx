import { useState, useEffect } from 'react';
import { Scissors, AlertCircle, Loader } from 'lucide-react';
import Camera from './components/Camera';
import FaceAnalysis from './components/FaceAnalysis';
import CustomerSearch from './components/CustomerSearch';
import SaveCustomer from './components/SaveCustomer';
import { loadModels, detectFace } from './utils/faceDetection';
import { FaceAnalysisResult, Customer } from './types';

function App() {
  const [modelsReady, setModelsReady] = useState(false);
  const [loadingModels, setLoadingModels] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<FaceAnalysisResult | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    initializeModels();
  }, []);

  const initializeModels = async () => {
    try {
      setLoadingModels(true);
      await loadModels();
      setModelsReady(true);
      setError('');
    } catch (err) {
      setError('فشل تحميل نماذج التعرف على الوجه. يرجى تحديث الصفحة.');
      console.error('Model loading error:', err);
    } finally {
      setLoadingModels(false);
    }
  };

  const handleCapture = async (video: HTMLVideoElement) => {
    setIsAnalyzing(true);
    setError('');

    try {
      const analysisResult = await detectFace(video);

      if (analysisResult) {
        setResult(analysisResult);
      } else {
        setError('لم يتم العثور على وجه في الصورة. يرجى التأكد من وضوح الوجه في الكاميرا.');
      }
    } catch (err) {
      setError('حدث خطأ أثناء تحليل الوجه. يرجى المحاولة مرة أخرى.');
      console.error('Face detection error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
  };

  const handleCustomerFound = (customer: Customer) => {
    setResult({
      shape: customer.faceShape,
      confidence: customer.confidence || 0.9,
      measurements: {
        faceWidth: 0,
        faceHeight: 0,
        jawWidth: 0,
        foreheadWidth: 0,
      },
    });
  };

  if (loadingModels) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-700">جاري تحميل نماذج التعرف على الوجه...</p>
        </div>
      </div>
    );
  }

  if (!modelsReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <p className="text-xl text-gray-700 mb-4">{error}</p>
          <button
            onClick={initializeModels}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Scissors className="w-12 h-12 text-blue-600" />
            <h1 className="text-5xl font-bold text-gray-900">
              مستشار التسريحات الذكي
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            اكتشف شكل وجهك واحصل على أفضل تسريحات الشعر المناسبة
          </p>
        </header>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <main className="flex flex-col items-center">
          {!result ? (
            <>
              <CustomerSearch onCustomerFound={handleCustomerFound} />
              <Camera onCapture={handleCapture} isAnalyzing={isAnalyzing} />
            </>
          ) : (
            <>
              <FaceAnalysis result={result} onReset={handleReset} />
              <div className="w-full max-w-4xl mt-6">
                <SaveCustomer result={result} />
              </div>
            </>
          )}
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>تطبيق التعرف على شكل الوجه باستخدام الذكاء الاصطناعي</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
