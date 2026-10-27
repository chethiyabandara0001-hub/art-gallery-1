import React, { useState } from 'react';

interface GalleryImageProps {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  className?: string;
  sizes?: string;
}

export function GalleryImage({ src, alt, loading = 'lazy', className = '', sizes }: GalleryImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) {
    return <div className={`image-unavailable ${className}`} role="img" aria-label={`Image unavailable: ${alt}`}>
      <span>Image unavailable</span><small>Check your connection or replace this sample photograph.</small>
    </div>;
  }

  return <img
    src={src} alt={alt} loading={loading} decoding="async" sizes={sizes}
    className={`${className} ${loaded ? 'is-loaded' : ''}`.trim()}
    onLoad={() => setLoaded(true)} onError={() => setFailed(true)}
  />;
}
