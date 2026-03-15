export type FaceShape = 'Round' | 'Square' | 'Oval' | 'Heart' | 'Oblong' | 'Diamond';

export interface HairstyleSuggestion {
  name: string;
  description: string;
  imageUrl?: string;
}

export interface FaceAnalysisResult {
  shape: FaceShape;
  confidence: number;
  measurements: {
    faceWidth: number;
    faceHeight: number;
    jawWidth: number;
    foreheadWidth: number;
  };
}

export interface Customer {
  id: string;
  name: string;
  faceShape: FaceShape;
  photoUrl?: string;
  createdAt: string;
}
