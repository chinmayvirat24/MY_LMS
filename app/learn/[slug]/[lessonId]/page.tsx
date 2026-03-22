import { notFound } from "next/navigation";
import { LearningWorkspace } from "@/components/learning-workspace";
import { getCourseBySlug } from "@/lib/data";

type LearningPageProps = {
  params: {
    slug: string;
    lessonId: string;
  };
};

export default function LearningPage({ params }: LearningPageProps) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  return <LearningWorkspace course={course} lessonId={params.lessonId} />;
}
