export type ExhibitionCategory = 
  | 'ALL'
  | 'FORM'
  | 'NATURE'
  | 'HUMAN'
  | 'ABSTRACT'
  | 'SPACES';

export interface VisualGenerativeConfig {
  type: 'architectural' | 'mineral' | 'chiaroscuro' | 'chromatic' | 'ocean' | 'sculptural' | 'minimalist';
  baseColor: string;
  secondaryColor: string;
  accentColor: string;
  texturePattern: string;
}

export interface Artwork {
  id: string;
  accessionNumber: string;
  title: string;
  series?: string;
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  category: ExhibitionCategory;
  layoutRole: 'monument' | 'quiet' | 'collision-a' | 'collision-b' | 'immersion' | 'archive-1' | 'archive-2' | 'archive-3' | 'kinetic-void';
  aspectRatio: '16:9' | '4:3' | '3:4' | '1:1' | '21:9';
  curatorialNote: string;
  exhibitionRoom: string;
  wallBackground?: string; // Optional custom room background
  palette: string[];
  generativeConfig: VisualGenerativeConfig;
  verifiedImageUrl?: string; // High-res permanent open museum link
}

export interface CuratorialChapter {
  stepNumber: string;
  subtitle: string;
  title: string;
  essay: string;
  spec: string;
  detailImageGenerative: VisualGenerativeConfig;
}
