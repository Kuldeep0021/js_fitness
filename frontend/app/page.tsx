import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import GallerySection from '@/components/GallerySection';
import AboutSection from '@/components/AboutSection';
import BmiCalculator from '@/components/BmiCalculator';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JS Fitness — Best Gym in Sohna',
  description:
    'JS Fitness Sohna offers premium equipment, certified trainers, and personalized diet plans. Join 500+ members and transform your body.',
  openGraph: {
    title: 'JS Fitness — Best Gym in Sohna, Gurugram',
    description:
      'Premium gym with modern equipment, certified trainers, and personalized plans. Visit JS Fitness in Sohna.',
    url: 'https://jsfitness.com',
    images: [
      {
        url: 'https://jsfitness.com/images/gym-exterior.jpg',
        width: 1200,
        height: 630,
        alt: 'JS Fitness Exterior',
      },
    ],
    siteName: 'JS Fitness Sohna',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JS Fitness — Best Gym in Sohna',
    description:
      'Premium gym with certified trainers and personalized plans in Sohna, Gurugram.',
    images: ['https://jsfitness.com/images/gym-exterior.jpg'],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Navbar />
      <HeroSection />
      <GallerySection />
      <AboutSection />
      <BmiCalculator />
      <PricingSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
