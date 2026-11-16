import { ArrowRight, MapPin, Phone, Clock } from 'lucide-react';
import { BUSINESS_INFO, GALLERY_PHOTOS } from '../data/carWashData';
import { ResilientImage } from './ResilientImage';

export function HeroSection() {
  const heroPhoto = GALLERY_PHOTOS[0];

  return (
    <section id="top" className="bg-slate-50 border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Proposition & Primary Action */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <div>
              <p className="text-sm font-medium text-[#0B3D91]">
                Washington, DC Hand Wash &amp; Detailing · 3010 Rhode Island Ave NE
              </p>
              <h1
                className="mt-3 font-display font-bold tracking-tight text-slate-900"
                style={{
                  fontSize: 'clamp(2.35rem, 4.2vw, 3.75rem)',
                  lineHeight: 1.06,
                  textWrap: 'balance',
                }}
              >
                Spotless Car, Every Time.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Amigos Car Wash delivers meticulous exterior hand washing, deep cabin vacuuming,
                and protective paint care right on Rhode Island Ave NE. Reserve your bay online in
                seconds or drive in today.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#booking"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#1D9BF0] px-6 py-3 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#0B3D91] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3D91]"
              >
                <span>Schedule Your Wash</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-[#0B3D91] transition-colors duration-150 hover:border-[#0B3D91] hover:bg-slate-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right column: Full-height real facility photo */}
          <div className="lg:col-span-6">
            <div className="relative h-64 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 sm:h-80 lg:h-full lg:min-h-[340px] lg:max-h-[400px]">
              <ResilientImage
                src={heroPhoto.url}
                alt={heroPhoto.alt}
                title={heroPhoto.title}
                loading="eager"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-5 pr-28 sm:p-6">
                <p className="font-display text-base font-semibold text-white">
                  {heroPhoto.title}
                </p>
                <p className="mt-1 text-sm text-slate-200">
                  {BUSINESS_INFO.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 3-column key facts bar */}
        <div className="mt-10 grid grid-cols-1 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex items-start gap-3.5 p-5">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#1D9BF0]" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-slate-500">Location</p>
              <a
                href={BUSINESS_INFO.mapsQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 block text-sm font-semibold text-slate-900 hover:text-[#0B3D91] hover:underline"
              >
                3010 Rhode Island Ave NE, Washington, DC 20018
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-5">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#1D9BF0]" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-slate-500">Phone &amp; WhatsApp</p>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="mt-0.5 block text-sm font-semibold tabular-nums text-slate-900 hover:text-[#0B3D91] hover:underline"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-5">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#1D9BF0]" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-slate-500">Open Daily</p>
              <p className="mt-0.5 text-sm font-semibold tabular-nums text-slate-900">
                {BUSINESS_INFO.hoursSummary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
