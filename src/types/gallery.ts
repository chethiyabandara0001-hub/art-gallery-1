/** Public gallery types. Only describe what the sample image actually provides. */
export type ExhibitionCategory = 'ALL' | 'FORM' | 'NATURE' | 'HUMAN' | 'ABSTRACT' | 'SPACES';

export interface Artwork {
  id: string;
  title: string;
  category: Exclude<ExhibitionCategory, 'ALL'>;
  imageUrl: string;
  alt: string;
  /** A short observational subtitle, not a provenance claim. */
  subtitle: string;
  shape: 'wide' | 'portrait' | 'square' | 'panorama';
}
