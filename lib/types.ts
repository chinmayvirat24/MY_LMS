export type AccessType = "free" | "paid" | "subscription";
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export type Lesson = {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  videoId: string;
  embedUrl: string;
  thumbnailUrl: string;
  position: number;
  durationMinutes: number;
  isCompleted?: boolean;
  isLocked?: boolean;
};

export type Section = {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  level: CourseLevel;
  accessType: AccessType;
  price: number | null;
  instructor: string;
  rating: number;
  reviewCount: number;
  students: number;
  lessonsCount: number;
  durationMinutes: number;
  thumbnailUrl: string;
  accent: {
    from: string;
    to: string;
    glow: string;
  };
  sections: Section[];
  whatYouWillLearn: string[];
  tags: string[];
};

export type PlatformFeature = {
  title: string;
  description: string;
  metric: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
  hint: string;
};

export type PurchaseRecord = {
  id: string;
  label: string;
  amount: number;
  status: "Paid" | "Pending";
  date: string;
};

export type SubscriptionPlan = {
  name: string;
  price: number;
  billingLabel: string;
  seats: string;
  perks: string[];
};

export type UserProfile = {
  name: string;
  email: string;
  role: string;
  initials: string;
  bio: string;
  enrolledCourseSlugs: string[];
  purchasedCourseSlugs: string[];
  savedCourseSlugs: string[];
  completedLessonIds: string[];
  recentlyWatchedLessonIds: string[];
  activeSubscription: boolean;
  hoursLearned: number;
  certificates: number;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
