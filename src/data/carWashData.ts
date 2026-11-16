export interface WashPackage {
  id: string;
  number: string;
  name: string;
  duration: string;
  summary: string;
  highlights: string[];
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  alt: string;
}

export interface TestimonialItem {
  id: string;
  customerName: string;
  vehicleContext: string;
  rating: number;
  quote: string;
  serviceUsed: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const BUSINESS_INFO = {
  name: 'Amigos Car Wash',
  slogan: 'Spotless Car, Every Time',
  address: '3010 Rhode Island Ave NE, Washington, DC 20018, USA',
  phoneDisplay: '(703) 499-6775',
  phoneHref: 'tel:+17034996775',
  whatsappDigits: '17034996775',
  mapsQueryUrl:
    'https://www.google.com/maps/search/?api=1&query=3010+Rhode+Island+Ave+NE,+Washington,+DC+20018,+USA',
  hoursSummary: 'Monday – Sunday · 8:00 AM – 6:00 PM',
} as const;

export const WASH_PACKAGES: WashPackage[] = [
  {
    id: 'express-exterior',
    number: '01',
    name: 'Express Exterior Wash',
    duration: '25 min',
    summary:
      'Thorough pH-neutral foam bath, hand-dried finish, wheel face degreasing, and streak-free exterior glass.',
    highlights: [
      'High-pressure pre-rinse & thick snow foam',
      'Microfiber hand dry & mirror wipe-down',
      'Wheel & tire shine dressing',
    ],
  },
  {
    id: 'full-service',
    number: '02',
    name: 'Full Interior & Exterior',
    duration: '45 min',
    summary:
      'Complete cabin vacuuming, dashboard and console conditioning, door jamb cleaning, plus our signature exterior wash.',
    highlights: [
      'Deep cabin, trunk, and floor mat vacuuming',
      'UV-safe interior trim & cupholder detailing',
      'Inside-and-out crystal clear window polish',
    ],
  },
  {
    id: 'deep-detail',
    number: '03',
    name: 'Deep Detail & Carnauba Gloss',
    duration: '90 min',
    summary:
      'Intensive stain extraction, upholstery and leather care, clay decontamination, and protective gloss sealant.',
    highlights: [
      'Seat & carpet deep spot treatment',
      'Leather conditioning or fabric refresh',
      'Long-lasting protective paint sealant',
    ],
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'exterior-wash-crew',
    url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLfFZLxdFGPNG0wfQa74eQ4sm69vHy1v9wmWrQ6OPs0rOcfvngSJmzFNwvMM4aV796fdUMajViJfn049Midf1s-48v3eQZEwpN_9nTPF3lKedWqkmHwYNJqBljHHg_47zMZtmOkk=s4800-w1024',
    title: 'Exterior Wash & Crew Care',
    caption: 'Full exterior hand wash, wheel cleaning, and final inspection on Rhode Island Ave NE.',
    alt: 'Technician washing and inspecting a silver sedan at Amigos Car Wash in Washington, DC',
  },
  {
    id: 'interior-deep-clean',
    url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLfC4ZxX2Ru9IjdH7Nb2ZJ4VadB8XcssQkpHlsC-bBS5ZiOG5Rh_qQOYp68d3w228w64Ltf8EwErwgZFftLqyO9bWa66yEjC_mwijt3NbmRgi09UuQ92s6CEZZNBCb5P0a16KYc=s4800-w1024',
    title: 'Deep Interior Scrub & Vacuum',
    caption: 'Precision brush agitation and deep vacuuming across seats, carpets, and center consoles.',
    alt: 'Interior seat and center console detailing with cleaning brush at Amigos Car Wash',
  },
  {
    id: 'engine-bay-v6',
    url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLdjM04Nqw1I1TcMKbfSuBm-_wHElbpXH8BTOwA_XRWe3_Xh35QMCYsbflDK5R_3nvsuWFcJex6D-FJUftbvc6VYvN4Yh5dhJtLHBOjcRwqG-Et2yJX0hoe1-maNGD--oVi3n-oDhA=s4800-w1024',
    title: 'Engine Bay Detailing',
    caption: 'Degreased, steam-cleaned, and dressed V6 engine compartment with a clean satin finish.',
    alt: 'Spotless detailed V6 engine bay cleaned at Amigos Car Wash',
  },
  {
    id: 'engine-bay-care',
    url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLfh5MbQcvQEow6Mgdaja9_kDSYM6VEkZdG4ZMQSj3ijv0t3-usrCUBFfP-U0dcBtm7rgSaVWcLgpYHIXJjd3PDm2RU-BeaYaRxnHL9DYFB1YE781dbiN08PrMSOHUQnDJA1N-0sGg=s4800-w1024',
    title: 'Under-Hood Wash & Dressing',
    caption: 'Careful under-hood cleaning and trim conditioning that leaves every hose and cover spotless.',
    alt: 'Cleaned and dressed engine compartment at Amigos Car Wash on Rhode Island Ave NE',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    customerName: 'Carlos Henriquez',
    vehicleContext: 'SUV Owner · Northeast DC',
    rating: 5,
    serviceUsed: 'Full Interior & Exterior',
    quote:
      'After a weekend road trip left mud along the rocker panels and crumbs across the back seats, the crew returned my SUV looking showroom-fresh in under an hour.',
  },
  {
    id: 't2',
    customerName: 'Danielle Brooks',
    vehicleContext: 'Daily Commuter · Brookland',
    rating: 5,
    serviceUsed: 'Express Exterior Wash',
    quote:
      'I stop by Rhode Island Ave NE every two weeks. They hand-dry every mirror and door jamb carefully, and there are never water spots left on my black paint.',
  },
  {
    id: 't3',
    customerName: 'Trevor Alvarez',
    vehicleContext: 'Family Minivan · Takoma',
    rating: 5,
    serviceUsed: 'Deep Detail & Carnauba Gloss',
    quote:
      'Kids spilled juice across the rear carpet and the dashboard had months of dust. Amigos Car Wash lifted every stain and left the cabin smelling crisp and clean.',
  },
  {
    id: 't4',
    customerName: 'Nadia Patel',
    vehicleContext: 'Sedan Driver · Capitol Hill',
    rating: 5,
    serviceUsed: 'Full Interior & Exterior',
    quote:
      'Booking a morning slot online took less than a minute. When I pulled in at 9:30 AM, they were ready right away and finished ahead of schedule.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-booking',
    question: 'Do I need an appointment, or do you accept walk-ins?',
    answer:
      'Walk-ins are always welcome at 3010 Rhode Island Ave NE during business hours, and scheduling online guarantees a dedicated bay with zero waiting when you arrive.',
  },
  {
    id: 'faq-duration',
    question: 'How long does a full wash or detailing service take?',
    answer:
      'Our Express Exterior Wash takes about 25 minutes. A Full Interior & Exterior service averages 45 minutes, while our Deep Detail & Carnauba Gloss takes around 90 minutes depending on vehicle size.',
  },
  {
    id: 'faq-paint-safety',
    question: 'Are your soaps and brushes safe for dark paint and ceramic coatings?',
    answer:
      'Yes. We use pH-neutral foam cleaners, fresh microfiber wash mitts, and soft drying towels designed to protect clear coats, matte wraps, and ceramic-coated finishes.',
  },
  {
    id: 'faq-vehicles',
    question: 'Do you wash large SUVs, pickup trucks, and vans?',
    answer:
      'Yes. Our wash bays accommodate compact sedans, crossovers, full-size SUVs, minivans, and pickup trucks. Simply choose your vehicle type when booking so we prepare the right crew.',
  },
  {
    id: 'faq-weather',
    question: 'What if it rains on the day of my scheduled appointment?',
    answer:
      'You can reschedule or adjust your appointment time at no charge. Just message us on WhatsApp at (703) 499-6775 and we will move your slot to the next clear day.',
  },
  {
    id: 'faq-payments',
    question: 'What payment methods are accepted on-site?',
    answer:
      'We accept major credit and debit cards, contactless mobile pay, and cash directly at our Washington, DC location after your vehicle inspection.',
  },
];

export const VEHICLE_TYPES = ['Sedan / Coupe', 'SUV / Crossover', 'Pickup Truck / Van'] as const;

export const BASE_TIME_SLOTS = [
  '08:30 AM',
  '09:30 AM',
  '10:30 AM',
  '11:30 AM',
  '01:00 PM',
  '02:00 PM',
  '03:30 PM',
  '04:30 PM',
] as const;
