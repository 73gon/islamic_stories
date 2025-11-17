import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';
import type { ProphetStory } from '@/types/prophet';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from "react-markdown";

interface ProphetDetailProps {
  prophet: ProphetStory;
}

export function ProphetDetail({ prophet }: ProphetDetailProps) {
  const { t } = useTranslation();
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const summaryRef = useRef<HTMLElement | null>(null);
  const lessonsRef = useRef<HTMLElement | null>(null);
  const isScrollingRef = useRef(false);

  const story = t(prophet.storyKey, { returnObjects: true }) as { chapters?: Array<{ title: string; text: string }> };
  const chapters = story?.chapters || [];

  useEffect(() => {
    const allRefs = [summaryRef.current, ...chapterRefs.current, lessonsRef.current].filter(Boolean);
    if (allRefs.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Skip if we're in the middle of a manual scroll
        if (isScrollingRef.current) return;

        // Find the entry that is most intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Get the one that's closest to the top
          const topMostEntry = visibleEntries.reduce((prev, current) => {
            return current.boundingClientRect.top < prev.boundingClientRect.top ? current : prev;
          });

          if (topMostEntry.target === summaryRef.current) {
            setActiveChapter(-1);
          } else if (topMostEntry.target === lessonsRef.current) {
            setActiveChapter(chapters.length);
          } else {
            const index = chapterRefs.current.findIndex((ref) => ref === topMostEntry.target);
            if (index !== -1) {
              setActiveChapter(index);
            }
          }
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    allRefs.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [chapters.length]);

  const scrollToChapter = (index: number) => {
    let element: HTMLElement | null = null;
    
    if (index === -1) {
      element = summaryRef.current;
    } else if (index === chapters.length) {
      element = lessonsRef.current;
    } else {
      element = chapterRefs.current[index];
    }

    if (element) {
      // Set the active chapter immediately
      setActiveChapter(index);

      // Disable observer during manual scroll
      isScrollingRef.current = true;

      const yOffset = -100; // Offset to account for any fixed headers or spacing
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      // Re-enable observer after scroll completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  return (
    <div className='relative w-full'>
      <div className='flex justify-center'>
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='w-full max-w-3xl px-4 sm:px-6 py-8 sm:py-12'>
          {/* Main Content - Centered */}
          {/* Back Link */}
          <Link to='/' className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8'>
            <ArrowLeft className='h-4 w-4' />
            {t('prophetDetail.backToList')}
          </Link>

          {/* Title Block */}
          <header className='space-y-3 mb-12'>
            <div className='flex items-baseline justify-between gap-3'>
              <h1 className='text-3xl sm:text-4xl font-bold text-foreground'>
                {t(prophet.nameKey)}
                {prophet.id === 'muhammad' && <span className='text-2xl sm:text-3xl ml-2'>ﷺ</span>}
              </h1>
              {prophet.arabicName && <span className='text-2xl sm:text-3xl text-muted-foreground font-arabic'>{prophet.arabicName}</span>}
            </div>
            <div className='flex items-center justify-between gap-4'>
              {prophet.titleKey && <p className='text-lg sm:text-xl text-muted-foreground'>{t(prophet.titleKey)}</p>}
              {prophet.eraKey && <p className='text-sm text-muted-foreground whitespace-nowrap'>{t(prophet.eraKey)}</p>}
            </div>
          </header>

          <Separator className='my-8' />

          {/* Summary Section */}
          <section ref={summaryRef} className='space-y-4 mb-12'>
            <h2 className='text-xl font-semibold text-foreground mt-2 mb-3'>{t('prophetDetail.summary')}</h2>
            <p className='text-base text-foreground/90 leading-relaxed'>{t(prophet.summaryKey)}</p>
          </section>

          <Separator className='my-8' />

          {/* Story Section with Chapters */}
          <section className='space-y-6 mb-12'>
            <h2 className='text-xl font-semibold text-foreground mt-2 mb-3'>{t('prophetDetail.story')}</h2>
            <div className='space-y-8'>
              {chapters.map((chapter, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    chapterRefs.current[index] = el;
                  }}
                  className='space-y-3'
                >
                  <h3 className='text-lg font-semibold text-foreground'>{chapter.title}</h3>
                  <div className='text-base text-foreground/90 leading-relaxed'>
                    <ReactMarkdown>{chapter.text}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lessons Section */}
          {prophet.lessonsKeys.length > 0 && (
            <>
              <Separator className='my-8' />
              <section ref={lessonsRef} className='space-y-4 mb-12'>
                <h2 className='text-xl font-semibold text-foreground mt-2 mb-3'>{t('prophetDetail.lessons')}</h2>
                <ul className='space-y-3'>
                  {prophet.lessonsKeys.map((lessonKey, index) => (
                    <li key={index} className='flex gap-3'>
                      <span className='text-primary font-bold mt-0.5 flex-shrink-0'>•</span>
                      <span className='text-base text-foreground/90 leading-relaxed'>{t(lessonKey)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {/* Quran References Section */}
          {prophet.quranRefs.length > 0 && (
            <>
              <Separator className='my-8' />
              <section className='space-y-4 mb-12'>
                <h2 className='text-xl font-semibold text-foreground mt-2 mb-3'>{t('prophetDetail.quranReferences')}</h2>
                <div className='flex flex-wrap gap-2'>
                  {prophet.quranRefs.map((ref, index) => (
                    <span key={index} className='inline-flex items-center px-3 py-1.5 text-sm font-medium bg-muted text-foreground rounded-full'>
                      {ref.surah}:{ref.ayat}
                    </span>
                  ))}
                </div>
              </section>
            </>
          )}
        </motion.article>

        {/* Sidebar - Chapters Navigation (Positioned next to content) */}
        <aside className='hidden lg:block w-64 flex-shrink-0 py-8 sm:py-12 pl-8'>
          <div className='sticky top-1/2 -translate-y-1/2'>
            <nav className='space-y-1'>
              {/* Summary Link */}
              <div>
                <button
                  onClick={() => scrollToChapter(-1)}
                  className={`w-full text-left px-2 py-2 text-sm rounded-md transition-all ${
                    activeChapter === -1 ? 'text-primary font-medium bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {t('prophetDetail.summary')}
                </button>
                <Separator className='my-1' />
              </div>

              {/* Chapter Links */}
              {chapters.map((chapter, index) => (
                <div key={index}>
                  <button
                    onClick={() => scrollToChapter(index)}
                    className={`w-full text-left px-2 py-2 text-sm rounded-md transition-all ${
                      activeChapter === index ? 'text-primary font-medium bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {chapter.title}
                  </button>
                  {(index < chapters.length - 1 || prophet.lessonsKeys.length > 0) && <Separator className='my-1' />}
                </div>
              ))}

              {/* Lessons Link */}
              {prophet.lessonsKeys.length > 0 && (
                <div>
                  <button
                    onClick={() => scrollToChapter(chapters.length)}
                    className={`w-full text-left px-2 py-2 text-sm rounded-md transition-all ${
                      activeChapter === chapters.length ? 'text-primary font-medium bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {t('prophetDetail.lessons')}
                  </button>
                </div>
              )}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
