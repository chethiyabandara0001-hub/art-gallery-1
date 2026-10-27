import type { Artwork, ExhibitionCategory } from '../types/gallery';

/**
 * The source project supplied these Unsplash photographs but no documented
 * ownership, artist credits, medium, dates, or provenance. These are explicitly
 * sample editorial titles, NOT attributed original artworks.
 * Replace imageUrl and metadata with licensed / owned works before publishing.
 */
export const ARTWORKS: Artwork[] = [
  {
    id: 'study-01', title: 'The shape of a room', category: 'FORM',
    subtitle: 'Structure / Study 01', shape: 'wide',
    alt: 'An architectural photographic study',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85',
  },
  {
    id: 'study-02', title: 'Someone, somewhere', category: 'HUMAN',
    subtitle: 'Portrait / Study 02', shape: 'portrait',
    alt: 'A portrait photograph',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'study-03', title: 'In colour', category: 'ABSTRACT',
    subtitle: 'Surface / Study 03', shape: 'square',
    alt: 'An artwork with expressive colour',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'study-04', title: 'After the sun', category: 'NATURE',
    subtitle: 'Landscape / Study 04', shape: 'portrait',
    alt: 'Desert landscape with softly lit dunes',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'study-05', title: 'Where the land ends', category: 'NATURE',
    subtitle: 'Coast / Study 05', shape: 'panorama',
    alt: 'A sandy coast and open blue water',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'study-06', title: 'A change of material', category: 'FORM',
    subtitle: 'Object / Study 06', shape: 'portrait',
    alt: 'A sculptural object in a gallery-like setting',
    imageUrl: 'https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'study-07', title: 'A way through', category: 'SPACES',
    subtitle: 'Architecture / Study 07', shape: 'square',
    alt: 'Looking up at the lines of a tall building',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1300&q=85',
  },
  {
    id: 'study-08', title: 'Small green things', category: 'NATURE',
    subtitle: 'Botanical / Study 08', shape: 'portrait',
    alt: 'A close view of a green botanical subject',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'study-09', title: 'A longer look', category: 'SPACES',
    subtitle: 'Landscape / Study 09', shape: 'wide',
    alt: 'A still landscape with water and mountains',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85',
  },
];

export const FILTERS: { id: ExhibitionCategory; label: string }[] = [
  { id: 'ALL', label: 'Everything' },
  { id: 'FORM', label: 'Form' },
  { id: 'NATURE', label: 'Nature' },
  { id: 'HUMAN', label: 'People' },
  { id: 'ABSTRACT', label: 'Colour' },
  { id: 'SPACES', label: 'Places' },
];
