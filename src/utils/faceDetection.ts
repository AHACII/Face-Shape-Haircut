import * as faceapi from 'face-api.js';
import { FaceShape, FaceAnalysisResult } from '../types';

let modelsLoaded = false;

export const loadModels = async (): Promise<void> => {
  if (modelsLoaded) return;

  const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model';

  try {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ]);
    modelsLoaded = true;
  } catch (error) {
    console.error('Error loading face-api models:', error);
    throw new Error('Failed to load face detection models');
  }
};

export const detectFace = async (
  input: HTMLVideoElement | HTMLImageElement
): Promise<FaceAnalysisResult | null> => {
  try {
    const detection = await faceapi
      .detectSingleFace(input, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();

    if (!detection) {
      return null;
    }

    const landmarks = detection.landmarks;
    const faceShape = calculateFaceShape(landmarks);
    const measurements = calculateMeasurements(landmarks);

    return {
      shape: faceShape,
      confidence: detection.detection.score,
      measurements,
    };
  } catch (error) {
    console.error('Error detecting face:', error);
    return null;
  }
};

const calculateMeasurements = (landmarks: faceapi.FaceLandmarks68) => {
  const jaw = landmarks.getJawOutline();
  const leftCheek = landmarks.getLeftEyeBrow();
  const rightCheek = landmarks.getRightEyeBrow();
  const nose = landmarks.getNose();

  const jawWidth = Math.abs(jaw[16].x - jaw[0].x);
  const foreheadWidth = Math.abs(rightCheek[4].x - leftCheek[0].x);
  const cheekWidth = Math.abs(jaw[14].x - jaw[2].x);
  const faceHeight = Math.abs(nose[6].y - jaw[8].y);
  const faceWidth = Math.max(jawWidth, foreheadWidth, cheekWidth);

  return {
    faceWidth,
    faceHeight,
    jawWidth,
    foreheadWidth,
  };
};

const calculateFaceShape = (landmarks: faceapi.FaceLandmarks68): FaceShape => {
  const measurements = calculateMeasurements(landmarks);
  const { faceWidth, faceHeight, jawWidth, foreheadWidth } = measurements;

  const ratio = faceWidth / faceHeight;
  const jawToForeheadRatio = jawWidth / foreheadWidth;

  if (ratio > 0.85 && jawToForeheadRatio > 0.9) {
    return 'Square';
  }

  if (ratio < 0.75) {
    return 'Oblong';
  }

  if (jawToForeheadRatio < 0.75) {
    return 'Heart';
  }

  if (jawToForeheadRatio > 1.1 && ratio > 0.8) {
    return 'Diamond';
  }

  if (ratio >= 0.75 && ratio <= 0.85 && Math.abs(jawToForeheadRatio - 1) < 0.15) {
    return 'Oval';
  }

  return 'Round';
};
