import { useRef, useEffect, useState } from 'react';
import { Camera as CameraIcon, RotateCw } from 'lucide-react';

interface CameraProps {
  onCapture: (video: HTMLVideoElement) => void;
  isAnalyzing: boolean;
}

export default function Camera({ onCapture, isAnalyzing }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setCameraReady(true);
        setError('');
      }
    } catch (err) {
      setError('تعذر الوصول للكاميرا. يرجى السماح بالوصول للكاميرا.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleCapture = () => {
    if (videoRef.current && cameraReady) {
      onCapture(videoRef.current);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full max-w-2xl"
          onLoadedMetadata={() => setCameraReady(true)}
        />
        {!cameraReady && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <RotateCw className="w-12 h-12 text-white animate-spin" />
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-600 bg-red-50 px-4 py-3 rounded-lg text-center">
          {error}
        </div>
      )}

      <button
        onClick={handleCapture}
        disabled={!cameraReady || isAnalyzing}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all transform hover:scale-105 disabled:hover:scale-100"
      >
        <CameraIcon className="w-6 h-6" />
        {isAnalyzing ? 'جاري التحليل...' : 'تحليل الوجه'}
      </button>
    </div>
  );
}
