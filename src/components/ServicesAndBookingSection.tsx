import { useMemo, useState, FormEvent } from 'react';
import { Calendar, CheckCircle2, Clock, MessageCircle } from 'lucide-react';
import {
  BUSINESS_INFO,
  VEHICLE_TYPES,
  WASH_PACKAGES,
} from '../data/carWashData';
import {
  BookingInput,
  ValidationErrors,
  buildWhatsAppUrl,
  formatBookingWhatsAppMessage,
  getAvailableTimeSlots,
  getDefaultBookingDate,
  getTodayIsoDate,
  validateBookingInput,
} from '../utils/carWashHelpers';

interface ConfirmedBooking extends BookingInput {
  serviceName: string;
  whatsappUrl: string;
}

export function ServicesAndBookingSection() {
  const todayIso = useMemo(() => getTodayIsoDate(), []);
  const defaultDate = useMemo(() => getDefaultBookingDate(), []);

  const [selectedServiceId, setSelectedServiceId] = useState<string>(WASH_PACKAGES[1].id);
  const [vehicleType, setVehicleType] = useState<string>(VEHICLE_TYPES[0]);
  const [date, setDate] = useState<string>(defaultDate);
  const [timeSlot, setTimeSlot] = useState<string>('10:30 AM');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  const availableSlots = useMemo(() => getAvailableTimeSlots(date), [date]);

  const handleDateChange = (nextDate: string) => {
    setDate(nextDate);
    setErrors((prev) => ({ ...prev, date: '', timeSlot: '' }));
    const nextSlots = getAvailableTimeSlots(nextDate);
    if (!nextSlots.includes(timeSlot)) {
      setTimeSlot(nextSlots[0] ?? '');
    }
  };

  const handleSelectPackage = (packageId: string) => {
    setSelectedServiceId(packageId);
    setConfirmedBooking(null);
    setErrors((prev) => ({ ...prev, serviceId: '' }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input: BookingInput = {
      serviceId: selectedServiceId,
      vehicleType,
      date,
      timeSlot,
      customerName,
      customerPhone,
    };

    const validationErrors = validateBookingInput(input);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const chosenPackage =
      WASH_PACKAGES.find((pkg) => pkg.id === selectedServiceId) ?? WASH_PACKAGES[0];
    const message = formatBookingWhatsAppMessage(input, chosenPackage.name);
    const whatsappUrl = buildWhatsAppUrl(BUSINESS_INFO.whatsappDigits, message);

    setErrors({});
    setConfirmedBooking({
      ...input,
      serviceName: chosenPackage.name,
      whatsappUrl,
    });
  };

  const handleResetBooking = () => {
    setConfirmedBooking(null);
    setCustomerName('');
    setCustomerPhone('');
    setErrors({});
  };

  return (
    <section id="services" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Services Overview */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#1D9BF0]">Wash Packages</p>
          <h2
            className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Carefully tailored wash &amp; detailing options
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Select any package below to pre-fill your online appointment. Every vehicle leaves
            hand-dried and inspected.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {WASH_PACKAGES.map((pkg) => {
            const isSelected = pkg.id === selectedServiceId;
            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-xl border p-6 transition-colors duration-150 ${
                  isSelected
                    ? 'border-[#1D9BF0] bg-[#1D9BF0]/[0.04]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-sm font-semibold tabular-nums text-[#0B3D91]">
                      {pkg.number}. {pkg.duration}
                    </span>
                    {isSelected && (
                      <span className="text-xs font-semibold text-[#1D9BF0]">Selected</span>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-slate-900">
                    {pkg.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{pkg.summary}</p>
                  <ul className="mt-5 space-y-2 border-t border-slate-200/80 pt-4 text-sm text-slate-700">
                    {pkg.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#1D9BF0]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#booking"
                  onClick={() => handleSelectPackage(pkg.id)}
                  className={`mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-150 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#0B3D91] text-white hover:bg-[#0B3D91]/90'
                      : 'border border-slate-300 bg-white text-[#0B3D91] hover:border-[#1D9BF0] hover:bg-slate-50'
                  }`}
                >
                  {isSelected ? 'Selected for Booking' : `Select ${pkg.name}`}
                </a>
              </div>
            );
          })}
        </div>

        {/* Online Booking Section */}
        <div
          id="booking"
          className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-10"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold text-[#1D9BF0]">Online Booking</p>
              <h2
                className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900"
                style={{ textWrap: 'balance' }}
              >
                Reserve your wash bay in under a minute
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Choose your preferred date and time slot at 3010 Rhode Island Ave NE. Once
                confirmed, you can send your booking summary straight to our WhatsApp desk so our
                crew is ready when you pull in.
              </p>

              <dl className="mt-8 space-y-4 border-t border-slate-200 pt-6 text-sm">
                <div>
                  <dt className="font-semibold text-slate-900">No prepayment required</dt>
                  <dd className="mt-0.5 text-slate-600">
                    Inspect your freshly washed car before paying on-site.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Flexible rescheduling</dt>
                  <dd className="mt-0.5 text-slate-600">
                    Rain in the forecast? Message {BUSINESS_INFO.phoneDisplay} to move your slot.
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7">
              {confirmedBooking ? (
                <div
                  data-testid="booking-confirmation"
                  className="rounded-xl border border-[#1D9BF0]/40 bg-white p-6 sm:p-8"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-6 w-6 shrink-0 text-[#1D9BF0]"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-2xl font-bold text-slate-900">
                        Appointment Ready to Confirm
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        Your wash request has been prepared. Tap below to send it directly to our
                        WhatsApp desk at {BUSINESS_INFO.phoneDisplay}.
                      </p>
                    </div>
                  </div>

                  <dl className="mt-6 grid grid-cols-1 gap-4 rounded-lg bg-slate-50 p-4 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-slate-500">Wash Package</dt>
                      <dd className="mt-0.5 font-semibold text-slate-900">
                        {confirmedBooking.serviceName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Vehicle Type</dt>
                      <dd className="mt-0.5 font-semibold text-slate-900">
                        {confirmedBooking.vehicleType}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Date &amp; Time</dt>
                      <dd className="mt-0.5 font-semibold tabular-nums text-slate-900">
                        {confirmedBooking.date} · {confirmedBooking.timeSlot}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Driver</dt>
                      <dd className="mt-0.5 font-semibold text-slate-900">
                        {confirmedBooking.customerName} ({confirmedBooking.customerPhone})
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={confirmedBooking.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#1D9BF0] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B3D91] whitespace-nowrap"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Confirm via WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleResetBooking}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                    >
                      Schedule Another Wash
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
                >
                  <div className="space-y-6">
                    {/* Package selection */}
                    <div>
                      <label
                        htmlFor="booking-service"
                        className="block text-sm font-semibold text-slate-900"
                      >
                        Wash Package
                      </label>
                      <select
                        id="booking-service"
                        value={selectedServiceId}
                        onChange={(e) => handleSelectPackage(e.target.value)}
                        className="mt-2 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#1D9BF0] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/25"
                      >
                        {WASH_PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.name} ({pkg.duration})
                          </option>
                        ))}
                      </select>
                      {errors.serviceId && (
                        <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                          {errors.serviceId}
                        </p>
                      )}
                    </div>

                    {/* Vehicle type segmented buttons */}
                    <div>
                      <span className="block text-sm font-semibold text-slate-900">
                        Vehicle Size
                      </span>
                      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {VEHICLE_TYPES.map((type) => {
                          const active = vehicleType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => {
                                setVehicleType(type);
                                setErrors((prev) => ({ ...prev, vehicleType: '' }));
                              }}
                              aria-pressed={active}
                              className={`min-h-[44px] rounded-lg border px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                                active
                                  ? 'border-[#0B3D91] bg-[#0B3D91] text-white'
                                  : 'border-slate-300 bg-white text-slate-700 hover:border-[#1D9BF0]'
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                      {errors.vehicleType && (
                        <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                          {errors.vehicleType}
                        </p>
                      )}
                    </div>

                    {/* Date & Time Slot */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="booking-date"
                          className="flex items-center gap-1.5 text-sm font-semibold text-slate-900"
                        >
                          <Calendar className="h-4 w-4 text-[#1D9BF0]" aria-hidden="true" />
                          <span>Appointment Date</span>
                        </label>
                        <input
                          id="booking-date"
                          type="date"
                          min={todayIso}
                          value={date}
                          onChange={(e) => handleDateChange(e.target.value)}
                          className="mt-2 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm tabular-nums text-slate-900 focus:border-[#1D9BF0] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/25"
                        />
                        {errors.date && (
                          <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                            {errors.date}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="booking-time"
                          className="flex items-center gap-1.5 text-sm font-semibold text-slate-900"
                        >
                          <Clock className="h-4 w-4 text-[#1D9BF0]" aria-hidden="true" />
                          <span>Preferred Time</span>
                        </label>
                        <select
                          id="booking-time"
                          value={timeSlot}
                          onChange={(e) => {
                            setTimeSlot(e.target.value);
                            setErrors((prev) => ({ ...prev, timeSlot: '' }));
                          }}
                          className="mt-2 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm tabular-nums text-slate-900 focus:border-[#1D9BF0] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/25"
                        >
                          {availableSlots.length === 0 ? (
                            <option value="">No remaining slots today — pick another date</option>
                          ) : (
                            availableSlots.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))
                          )}
                        </select>
                        {errors.timeSlot && (
                          <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                            {errors.timeSlot}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Customer Name & Phone */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="booking-name"
                          className="block text-sm font-semibold text-slate-900"
                        >
                          Full Name
                        </label>
                        <input
                          id="booking-name"
                          type="text"
                          placeholder="e.g. Marcus Vance"
                          value={customerName}
                          onChange={(e) => {
                            setCustomerName(e.target.value);
                            setErrors((prev) => ({ ...prev, customerName: '' }));
                          }}
                          className="mt-2 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D9BF0] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/25"
                        />
                        {errors.customerName && (
                          <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                            {errors.customerName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="booking-phone"
                          className="block text-sm font-semibold text-slate-900"
                        >
                          Phone / WhatsApp
                        </label>
                        <input
                          id="booking-phone"
                          type="tel"
                          placeholder="(202) 555-0148"
                          value={customerPhone}
                          onChange={(e) => {
                            setCustomerPhone(e.target.value);
                            setErrors((prev) => ({ ...prev, customerPhone: '' }));
                          }}
                          className="mt-2 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm tabular-nums text-slate-900 placeholder:text-slate-400 focus:border-[#1D9BF0] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/25"
                        />
                        {errors.customerPhone && (
                          <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                            {errors.customerPhone}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#1D9BF0] px-6 py-3 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#0B3D91] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3D91]"
                    >
                      Book Appointment
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
