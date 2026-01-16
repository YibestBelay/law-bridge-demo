"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Share2, Bookmark } from "lucide-react";
import Layout from "@/components/shared/Layout";
import ProfileHeader from "@/components/lawyers/profile/ProfileHeader";
import KeyStats from "@/components/lawyers/profile/KeyStats";
import AboutSection from "@/components/lawyers/profile/AboutSection";
import SpecializationsSection from "@/components/lawyers/profile/SpecializationsSection";
import EducationSection from "@/components/lawyers/profile/EducationSection";
import LanguagesSection from "@/components/lawyers/profile/LanguagesSection";
import CaseExamplesSection from "@/components/lawyers/profile/CaseExamplesSection";
import AvailabilitySection from "@/components/lawyers/profile/AvailabilitySection";
import ReviewsSection from "@/components/lawyers/profile/ReviewsSection";
import BookingSidebar from "@/components/lawyers/profile/BookingSidebar";

// Fallback mock data for development
const mockLawyer = {
  id: "1",
  name: "Alemayehu Bekele",
  photo: "👨‍💼",
  title: "Senior Criminal Defense Attorney",
  rating: 4.9,
  reviews: 248,
  location: "Addis Ababa, Ethiopia",
  memberSince: "September 2023",
  verified: true,
  topRated: true,
  fastResponse: true,
  casesHandled: 248,
  successRate: 96,
  avgResponse: "1.5 hours",
  experience: 12,
  bio: "With over 12 years of experience in criminal defense law, Alemayehu Bekele has successfully represented clients in hundreds of cases across Ethiopia. He specializes in complex criminal matters, appeals, and defense strategy. His commitment to justice and client advocacy has earned him recognition as one of the top criminal defense attorneys in Addis Ababa. Alemayehu is known for his thorough case preparation, strategic thinking, and dedication to achieving the best possible outcomes for his clients.",
  specializations: ["Criminal Law", "Appeals", "Defense Strategy"],
  areasOfPractice: [
    { name: "Criminal Defense", icon: "⚖️" },
    { name: "Appeals & Litigation", icon: "📋" },
    { name: "Juvenile Cases", icon: "👨‍👩‍👧‍👦" },
    { name: "White-collar Crime", icon: "💼" },
  ],
  education: [
    {
      degree: "Law Degree",
      institution: "Addis Ababa University",
      year: "2011",
    },
    {
      degree: "Bar License",
      institution: "Ethiopian Bar Association",
      year: "2012",
    },
    {
      degree: "Continuing Education Certificate",
      institution: "Ethiopian Legal Institute",
      year: "2024",
    },
  ],
  licenseNumber: "ETH-BAR-2012-1245",
  languages: [
    { name: "Amharic", flag: "🇪🇹", level: "Native" },
    { name: "English", flag: "🇬🇧", level: "Fluent" },
    { name: "French", flag: "🇫🇷", level: "Conversational" },
  ],
  notableCases: [
    {
      type: "Criminal Defense",
      description:
        "Successfully defended client in complex fraud case involving multiple parties and jurisdictions.",
      outcome: "Won",
      year: "2023",
    },
    {
      type: "Appeals",
      description:
        "Overturned lower court decision in high-profile case, securing client's release.",
      outcome: "Won",
      year: "2022",
    },
    {
      type: "Criminal Defense",
      description:
        "Negotiated favorable settlement in white-collar crime case, avoiding trial.",
      outcome: "Settled",
      year: "2023",
    },
  ],
  availability: {
    status: "now",
    responseTime: "1-2 hours",
    lastActive: "6 days ago",
  },
  pricing: {
    consultation: 1500,
    hourly: 2000,
  },
};

const mockReviews = [
  {
    id: "1",
    clientInitials: "KT",
    rating: 5,
    date: "2024-01-15",
    text: "Alemayehu was incredibly professional and helped me navigate a difficult situation. His expertise and dedication to my case were evident throughout. Highly recommend!",
    caseType: "Criminal Defense",
    helpful: 24,
  },
  {
    id: "2",
    clientInitials: "MH",
    rating: 5,
    date: "2024-01-10",
    text: "Excellent lawyer with deep knowledge of Ethiopian law. He explained everything clearly and kept me informed at every step. The outcome exceeded my expectations.",
    caseType: "Appeals",
    helpful: 18,
  },
  {
    id: "3",
    clientInitials: "YM",
    rating: 4,
    date: "2024-01-05",
    text: "Very responsive and professional. The consultation was thorough and he provided clear guidance on my options. Would definitely work with him again.",
    caseType: "Criminal Defense",
    helpful: 12,
  },
  {
    id: "4",
    clientInitials: "ST",
    rating: 5,
    date: "2023-12-28",
    text: "Outstanding service! Alemayehu fought hard for my case and achieved a great result. His attention to detail and strategic approach made all the difference.",
    caseType: "White-collar Crime",
    helpful: 31,
  },
  {
    id: "5",
    clientInitials: "AB",
    rating: 5,
    date: "2023-12-20",
    text: "Professional, knowledgeable, and compassionate. He made a stressful situation much more manageable. Highly skilled attorney.",
    caseType: "Criminal Defense",
    helpful: 15,
  },
];

const ratingBreakdown = {
  5: { count: 210, percentage: 85 },
  4: { count: 28, percentage: 11 },
  3: { count: 8, percentage: 3 },
  2: { count: 2, percentage: 1 },
  1: { count: 0, percentage: 0 },
};

const similarLawyers = [
  {
    id: "2",
    name: "Meron Tadesse",
    photo: "👩‍💼",
    specialization: "Criminal Law",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Yonas Gebremariam",
    photo: "👨‍💼",
    specialization: "Criminal Defense",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Bethelhem Tesfaye",
    photo: "👩‍💼",
    specialization: "Criminal Law",
    rating: 4.7,
  },
];

export default function LawyerProfilePage() {
  const params = useParams();
  const lawyerId = params.id as string;
  const [saved, setSaved] = useState(false);
  const [lawyer, setLawyer] = useState<any>(mockLawyer);
  const [reviews, setReviews] = useState(mockReviews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLawyer = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/lawyers/${lawyerId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch lawyer");
        }
        const data = await response.json();
        setLawyer(data);
        setReviews(data.reviews || mockReviews);
      } catch (err) {
        console.error("Error fetching lawyer:", err);
        setError("Failed to load lawyer profile");
        // Keep mock data as fallback
      } finally {
        setLoading(false);
      }
    };

    if (lawyerId) {
      fetchLawyer();
    }
  }, [lawyerId]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mx-auto mb-4"></div>
            <p className="text-gray-600">Loading lawyer profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error && !lawyer) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Link
              href="/lawyers"
              className="text-blue-600 hover:underline"
            >
              Back to Lawyers
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Calculate rating breakdown from reviews
  const ratingBreakdown = {
    5: reviews.filter((r: any) => r.rating === 5).length,
    4: reviews.filter((r: any) => r.rating === 4).length,
    3: reviews.filter((r: any) => r.rating === 3).length,
    2: reviews.filter((r: any) => r.rating === 2).length,
    1: reviews.filter((r: any) => r.rating === 1).length,
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-navy to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/lawyers"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Search Results</span>
            </Link>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProfileHeader
              lawyer={lawyer}
              saved={saved}
              onSave={() => setSaved(!saved)}
            />
          </div>
        </div>

        {/* Key Stats */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <KeyStats lawyer={lawyer} />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
          <div className="flex gap-8">
            {/* Main Content */}
            <main className="flex-1 lg:w-2/3 space-y-8">
              <AboutSection lawyer={lawyer} />
              <SpecializationsSection
                areasOfPractice={lawyer.areasOfPractice || []}
              />
              <EducationSection
                education={lawyer.education || []}
                licenseNumber={lawyer.licenseNumber || ""}
              />
              <LanguagesSection languages={lawyer.languages || []} />
              <CaseExamplesSection cases={lawyer.notableCases || []} />
              <AvailabilitySection availability={lawyer.availability || {}} />
              <ReviewsSection
                reviews={reviews}
                ratingBreakdown={ratingBreakdown}
                totalReviews={lawyer.reviews || 0}
              />
            </main>

            {/* Sidebar */}
            <aside className="hidden lg:block w-1/3">
              <div className="sticky top-4 space-y-6">
                <BookingSidebar
                  lawyer={lawyer}
                  similarLawyers={similarLawyers}
                />
              </div>
            </aside>
          </div>
        </div>

        {/* Mobile Sticky Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50 safe-area-inset-bottom">
          <div className="flex gap-3">
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-navy px-4 py-3 rounded-lg font-semibold transition-colors">
              Send Message
            </button>
            <button className="flex-1 bg-gold hover:bg-gold/90 text-navy px-4 py-3 rounded-lg font-semibold transition-colors">
              Request Consultation
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
