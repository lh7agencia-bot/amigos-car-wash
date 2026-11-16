import { BASE_TIME_SLOTS } from '../data/carWashData';

export interface BookingInput {
  serviceId: string;
  vehicleType: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export function getTodayIsoDate(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDefaultBookingDate(now: Date = new Date()): string {
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return getTodayIsoDate(tomorrow);
}

export function parseTimeSlotToMinutes(slot: string): number {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(slot.trim());
  if (!match) {
    return -1;
  }
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes;
}

export function getAvailableTimeSlots(
  selectedDate: string,
  now: Date = new Date()
): string[] {
  const todayIso = getTodayIsoDate(now);
  if (!selectedDate || selectedDate > todayIso) {
    return [...BASE_TIME_SLOTS];
  }
  if (selectedDate < todayIso) {
    return [];
  }
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return BASE_TIME_SLOTS.filter((slot) => parseTimeSlotToMinutes(slot) > currentMinutes + 30);
}

export function validateBookingInput(
  input: BookingInput,
  now: Date = new Date()
): ValidationErrors {
  const errors: ValidationErrors = {};
  const todayIso = getTodayIsoDate(now);

  if (!input.serviceId.trim()) {
    errors.serviceId = 'Please select a wash package.';
  }
  if (!input.vehicleType.trim()) {
    errors.vehicleType = 'Please select your vehicle type.';
  }
  if (!input.date.trim()) {
    errors.date = 'Please pick an appointment date.';
  } else if (input.date < todayIso) {
    errors.date = 'Please select today or an upcoming date.';
  }
  if (!input.timeSlot.trim()) {
    errors.timeSlot = 'Please select an available time slot.';
  }
  if (input.customerName.trim().length < 2) {
    errors.customerName = 'Please enter your full name.';
  }
  const digits = input.customerPhone.replace(/\D/g, '');
  if (digits.length < 10) {
    errors.customerPhone = 'Please enter a valid 10-digit phone number.';
  }

  return errors;
}

export function validateContactInput(input: ContactInput): ValidationErrors {
  const errors: ValidationErrors = {};

  if (input.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(input.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (input.message.trim().length < 8) {
    errors.message = 'Please write a short message (at least 8 characters).';
  }

  return errors;
}

export function buildWhatsAppUrl(phoneDigits: string, message: string): string {
  const cleanDigits = phoneDigits.replace(/\D/g, '');
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanDigits}?text=${encoded}`;
}

export function formatBookingWhatsAppMessage(
  booking: BookingInput,
  serviceName: string
): string {
  return [
    'Hello Amigos Car Wash! I would like to book a wash:',
    `• Service: ${serviceName}`,
    `• Vehicle: ${booking.vehicleType}`,
    `• Date: ${booking.date}`,
    `• Time: ${booking.timeSlot}`,
    `• Name: ${booking.customerName.trim()}`,
    `• Phone: ${booking.customerPhone.trim()}`,
  ].join('\n');
}

export function formatContactWhatsAppMessage(contact: ContactInput): string {
  return [
    'Hello Amigos Car Wash! Message from your website:',
    `• Name: ${contact.name.trim()}`,
    `• Email: ${contact.email.trim()}`,
    `• Message: ${contact.message.trim()}`,
  ].join('\n');
}

export function buildMailtoUrl(
  recipientEmail: string,
  subject: string,
  body: string
): string {
  return `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
