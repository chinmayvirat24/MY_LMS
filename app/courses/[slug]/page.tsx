import { notFound } from "next/navigation";
import { CourseDetail } from "@/components/course-detail";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getCourseBySlug } from "@/lib/data";

type CourseDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CourseDetail course={course} />
      </main>
      <Footer />
    </div>
  );
}
