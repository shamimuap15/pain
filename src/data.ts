import type { ProductVariant } from './types'

export const VARIANTS: ProductVariant[] = [
  { id: 'v30', size: '30 ml', price: 299, originalPrice: 450, savings: 151 },
  { id: 'v60', size: '60 ml', price: 549, originalPrice: 800, savings: 251 },
  { id: 'v100', size: '100 ml', price: 849, originalPrice: 1200, savings: 351 },
]

export const BENEFITS = [
  {
    icon: '⚡',
    title: 'Fast Acting Relief',
    desc: 'Feel the difference within minutes. Our formula absorbs quickly for near-instant pain relief.',
  },
  {
    icon: '💪',
    title: 'Deep Muscle Penetration',
    desc: 'Reaches deep tissue layers to relieve muscle pain, stiffness, and sports injuries.',
  },
  {
    icon: '🌿',
    title: '100% Natural Ingredients',
    desc: 'Crafted from pure herbal extracts with no artificial chemicals, parabens, or harmful additives.',
  },
  {
    icon: '✨',
    title: 'Non-Greasy Formula',
    desc: 'Absorbs fully without leaving a greasy residue — perfect for day-to-day use.',
  },
  {
    icon: '🕐',
    title: 'Long-Lasting Effect',
    desc: 'One application provides up to 6 hours of continuous relief so you can go about your day.',
  },
  {
    icon: '🩺',
    title: 'Clinically Validated',
    desc: 'Tested and validated by certified herbalists and recommended by physiotherapists.',
  },
]

export const INGREDIENTS = [
  {
    emoji: '🌲',
    name: 'Eucalyptus Oil',
    benefit: 'Anti-inflammatory & cooling',
    desc: 'Reduces swelling and provides a soothing cooling sensation to inflamed areas.',
  },
  {
    emoji: '🍃',
    name: 'Peppermint Extract',
    benefit: 'Numbing & pain relief',
    desc: 'Contains menthol that creates an immediate numbing effect on pain receptors.',
  },
  {
    emoji: '🌼',
    name: 'Camphor',
    benefit: 'Improves circulation',
    desc: 'Stimulates blood flow in the applied area to speed up natural healing.',
  },
  {
    emoji: '🌹',
    name: 'Clove Oil',
    benefit: 'Natural analgesic',
    desc: 'Eugenol in clove acts as a powerful natural analgesic blocking pain signals.',
  },
  {
    emoji: '❄️',
    name: 'Wintergreen',
    benefit: 'Muscle relaxant',
    desc: 'Methyl salicylate relaxes tense muscles and eases joint stiffness effectively.',
  },
  {
    emoji: '🫚',
    name: 'Sesame Base Oil',
    benefit: 'Deep carrier oil',
    desc: 'Carries active ingredients deep into tissue while nourishing and moisturizing skin.',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Karim Molla',
    location: 'Dhaka',
    rating: 5,
    text: 'আমার হাঁটুর ব্যথায় অনেক কষ্ট পাচ্ছিলাম। HerboRelief ব্যবহার করার পর মাত্র ১০ মিনিটেই অনেক আরাম পেয়েছি। সত্যিই অসাধারণ পণ্য!',
    translation: 'I was suffering badly from knee pain. After using HerboRelief I felt great relief in just 10 minutes. Truly amazing product!',
    avatar: 'KM',
  },
  {
    name: 'Nasrin Akter',
    location: 'Chittagong',
    rating: 5,
    text: 'As a nurse I stand for 12 hours daily. My back pain was unbearable. This oil has completely changed my life. I apply it before my shift and I\'m pain free all day.',
    avatar: 'NA',
  },
  {
    name: 'Rafiqul Islam',
    location: 'Sylhet',
    rating: 5,
    text: 'Used many imported pain oils before but nothing worked like HerboRelief. The smell is pleasant, it\'s non-greasy, and the relief is real. My whole family now uses it.',
    avatar: 'RI',
  },
]

export const FAQS = [
  {
    q: 'How quickly does HerboRelief work?',
    a: 'Most users feel relief within 5–15 minutes of application. For chronic pain or deep muscle injuries, it may take 2–3 applications over 2 days before you notice maximum benefit.',
  },
  {
    q: 'Is it safe for daily use?',
    a: 'Yes. HerboRelief is made from 100% natural herbal extracts and is safe for daily use. It contains no steroids, no parabens, and no harmful chemicals.',
  },
  {
    q: 'Can I use it for arthritis and joint pain?',
    a: 'Absolutely. HerboRelief is specially effective for arthritis, joint pain, back pain, neck pain, shoulder pain, and sports injuries.',
  },
  {
    q: 'What is the payment method?',
    a: 'We offer Cash on Delivery (COD) across Bangladesh. You can also pay via bKash before delivery. No advance payment required for COD orders.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Dhaka city: 1–2 business days. Outside Dhaka: 3–5 business days. We partner with reliable courier services to ensure safe delivery.',
  },
]
