import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/carWashData';
import { ResilientImage } from './ResilientImage';

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % GALLERY_PHOTOS.length));
  }, []);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        showPrev();
      } else if (event.key === 'ArrowRight') {
        showNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, closeLightbox, showPrev, showNext]);

  const activePhoto = activeIndex !== null ? GALLERY_PHOTOS[activeIndex] : null;

  return (
    <section id="gallery" className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#1D9BF0]">Facility &amp; Results</p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Inside Amigos Car Wash on Rhode Island Ave NE
            </h2>
          </div>
          <p className="text-sm text-slate-600">Select any photo to inspect full size</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY_PHOTOS.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View photo ${index + 1} of ${GALLERY_PHOTOS.length}: ${photo.title}`}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <ResilientImage
                  src={photo.url}
                  alt={photo.alt}
                  title={photo.title}
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950/70 text-white opacity-90 transition-opacity group-hover:opacity-100"
                >
                  <Expand className="h-4 w-4" />
                </span>
              </div>
              <div className="p-4">
                <p className="font-display text-base font-semibold text-slate-900">{photo.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {photo.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo lightbox: ${activePhoto.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 sm:px-6">
              <div>
                <p className="font-display text-base font-semibold text-white">
                  {activePhoto.title}
                </p>
                <p className="text-xs tabular-nums text-slate-400">
                  Photo {activeIndex + 1} of {GALLERY_PHOTOS.length}
                </p>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close lightbox"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex max-h-[68vh] min-h-[260px] items-center justify-center bg-black">
              <ResilientImage
                src={activePhoto.url}
                alt={activePhoto.alt}
                title={activePhoto.title}
                loading="eager"
                className="max-h-[68vh] w-full object-contain"
              />

              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-white transition-colors hover:bg-[#1D9BF0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-white transition-colors hover:bg-[#1D9BF0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="border-t border-slate-800 px-4 py-3.5 sm:px-6">
              <p className="text-sm text-slate-200">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
