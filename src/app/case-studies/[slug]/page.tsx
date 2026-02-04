import { notFound } from 'next/navigation';
import caseStudiesData from '@/content/data/case-studies.json';
import { CaseStudy } from '@/types';
import { CaseStudyHero } from '@/components/case-study/CaseStudyHero';
import { ProblemStatement } from '@/components/case-study/ProblemStatement';
import { ProcessTimeline } from '@/components/case-study/ProcessTimeline';
import { SolutionSection } from '@/components/case-study/SolutionSection';
import { ResultsImpact } from '@/components/case-study/ResultsImpact';
import { ProjectGallery } from '@/components/case-study/ProjectGallery';
import { ProjectNavigation } from '@/components/case-study/ProjectNavigation';

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return caseStudiesData.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = caseStudiesData.find((study) => study.slug === slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${caseStudy.title} | Case Study`,
    description: caseStudy.problemStatement,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = caseStudiesData.find((study) => study.slug === slug) as unknown as CaseStudy | undefined;

  if (!caseStudy) {
    notFound();
  }

  const currentIndex = caseStudiesData.findIndex((study) => study.slug === slug);
  const previousStudy = currentIndex > 0 ? (caseStudiesData[currentIndex - 1] as unknown as CaseStudy) : null;
  const nextStudy = currentIndex < caseStudiesData.length - 1 ? (caseStudiesData[currentIndex + 1] as unknown as CaseStudy) : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <CaseStudyHero caseStudy={caseStudy} />
      <ProblemStatement caseStudy={caseStudy} />
      <ResultsImpact caseStudy={caseStudy} />
      {caseStudy.images && caseStudy.images.length > 0 && (
        <ProjectGallery images={caseStudy.images} title={caseStudy.title} />
      )}
      <ProjectNavigation previous={previousStudy} next={nextStudy} />
    </main>
  );
}
