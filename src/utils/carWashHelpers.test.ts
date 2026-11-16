import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppUrl,
  formatBookingWhatsAppMessage,
  formatContactWhatsAppMessage,
  getAvailableTimeSlots,
  getTodayIsoDate,
  parseTimeSlotToMinutes,
  validateBookingInput,
  validateContactInput,
} from './carWashHelpers';

test('parseTimeSlotToMinutes parses AM and PM correctly', () => {
  assert.equal(parseTimeSlotToMinutes('08:30 AM'), 510);
  assert.equal(parseTimeSlotToMinutes('12:00 PM'), 720);
  assert.equal(parseTimeSlotToMinutes('01:00 PM'), 780);
  assert.equal(parseTimeSlotToMinutes('04:30 PM'), 990);
});

test('getAvailableTimeSlots filters out past slots on today and returns all for future dates', () => {
  const fixedNow = new Date(2026, 10, 16, 11, 15, 0); // Nov 16, 2026 11:15 AM
  const today = getTodayIsoDate(fixedNow);
  const todaySlots = getAvailableTimeSlots(today, fixedNow);
  assert.ok(!todaySlots.includes('08:30 AM'));
  assert.ok(!todaySlots.includes('11:30 AM')); // within 30-min buffer
  assert.ok(todaySlots.includes('01:00 PM'));

  const futureSlots = getAvailableTimeSlots('2026-11-20', fixedNow);
  assert.equal(futureSlots.length, 8);

  const pastSlots = getAvailableTimeSlots('2026-11-10', fixedNow);
  assert.equal(pastSlots.length, 0);
});

test('validateBookingInput catches missing or invalid fields', () => {
  const fixedNow = new Date(2026, 10, 16, 10, 0, 0);
  const invalidErrors = validateBookingInput(
    {
      serviceId: '',
      vehicleType: '',
      date: '2026-11-10',
      timeSlot: '',
      customerName: 'A',
      customerPhone: '12345',
    },
    fixedNow
  );

  assert.ok(invalidErrors.serviceId);
  assert.ok(invalidErrors.vehicleType);
  assert.ok(invalidErrors.date);
  assert.ok(invalidErrors.timeSlot);
  assert.ok(invalidErrors.customerName);
  assert.ok(invalidErrors.customerPhone);

  const validErrors = validateBookingInput(
    {
      serviceId: 'full-service',
      vehicleType: 'SUV / Crossover',
      date: '2026-11-17',
      timeSlot: '10:30 AM',
      customerName: 'Marcus Vance',
      customerPhone: '(703) 499-6775',
    },
    fixedNow
  );
  assert.deepEqual(validErrors, {});
});

test('validateContactInput validates name, email, and message length', () => {
  const errors = validateContactInput({
    name: 'M',
    email: 'not-an-email',
    message: 'Hi',
  });
  assert.ok(errors.name);
  assert.ok(errors.email);
  assert.ok(errors.message);

  const valid = validateContactInput({
    name: 'Marcus Vance',
    email: 'marcus@example.com',
    message: 'Do you offer undercarriage washes for SUVs?',
  });
  assert.deepEqual(valid, {});
});

test('buildWhatsAppUrl encodes phone and booking/contact messages cleanly', () => {
  const url = buildWhatsAppUrl('17034996775', 'Hello Amigos Car Wash!');
  assert.equal(url, 'https://wa.me/17034996775?text=Hello%20Amigos%20Car%20Wash!');

  const bookingText = formatBookingWhatsAppMessage(
    {
      serviceId: 'full-service',
      vehicleType: 'Sedan / Coupe',
      date: '2026-11-17',
      timeSlot: '10:30 AM',
      customerName: 'Elena Cruz',
      customerPhone: '2025550199',
    },
    'Full Interior & Exterior'
  );
  assert.match(bookingText, /Full Interior & Exterior/);
  assert.match(bookingText, /2026-11-17/);
  assert.match(bookingText, /10:30 AM/);

  const contactText = formatContactWhatsAppMessage({
    name: 'Elena Cruz',
    email: 'elena@example.com',
    message: 'Can I bring my SUV at 2 PM?',
  });
  assert.match(contactText, /Elena Cruz/);
  assert.match(contactText, /elena@example\.com/);
});
