import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/carWashData';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="border-t border-slate-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#1D9BF0]">Customer Testimonials</p>
          <h2
            className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Trusted by drivers across Washington, DC
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Real feedback from local commuters, SUV owners, and families who visit Amigos Car Wash
            for consistent results.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                    <span className="ml-1.5 text-xs font-semibold tabular-nums text-slate-700">
                      {item.rating}.0 / 5.0
                    </span>
                  </div>
                  <span className="text-xs font-medium text-[#0B3D91]">{item.serviceUsed}</span>
                </div>

                <blockquote className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <footer className="mt-5 flex items-center gap-2 border-t border-slate-200/80 pt-4 text-xs text-slate-500">
                <span className="font-semibold text-slate-900">{item.customerName}</span>
                <span aria-hidden="true">·</span>
                <span>{item.vehicleContext}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
