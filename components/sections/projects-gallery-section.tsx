'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';

export function ProjectsGallerySection() {
  const t = useTranslations('projectsHomepage');
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set());
  const headerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const projects = [
    {
      id: 1,
      title: t('project1.title'),
      category: t('project1.category'),
      image: '/projets/projet-1.png',
    },
    {
      id: 2,
      title: t('project2.title'),
      category: t('project2.category'),
      image: '/projets/projet-2.png',
    },
    {
      id: 3,
      title: t('project3.title'),
      category: t('project3.category'),
      image: '/projets/projet-3.png',
    },
    {
      id: 4,
      title: t('project4.title'),
      category: t('project4.category'),
      image: '/projets/projet-4.png',
    },
  ];

  // Observer pour le header
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(false);
            setTimeout(() => {
              setIsHeaderVisible(true);
            }, 100);
          } else {
            setIsHeaderVisible(false);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  // Observer pour chaque projet
  useEffect(() => {
    const observers = projectRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleProjects((prev) => new Set(prev).add(index));
            } else {
              setVisibleProjects((prev) => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
              });
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (observer && projectRefs.current[index]) {
          observer.unobserve(projectRefs.current[index]!);
        }
      });
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-[#F5F5F5] overflow-x-hidden">
      {/* Fixed Title Section */}
      <div
        ref={headerRef}
        className="sticky top-0 left-0 right-0 h-screen flex items-center justify-center z-0 pointer-events-none"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center">
            {/* Title */}
            <h2
              className={`text-5xl md:text-7xl lg:text-8xl font-black text-black leading-tight text-center mb-8 transition-all duration-700 ease-out ${isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              style={{ transitionDelay: '100ms' }}
            >
              {t('title')}
            </h2>
            <h2
              className={`text-5xl md:text-7xl lg:text-8xl font-black text-black leading-tight text-center mb-8 transition-all duration-700 ease-out ${isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              style={{ transitionDelay: '200ms' }}
            >
              {t('subtitle')}
            </h2>

            {/* Description and buttons - positioned more to the right */}
            <div
              className={`w-full max-w-2xl mx-auto lg:ml-auto lg:mr-32 lg:mx-0 text-center lg:text-left pointer-events-auto transition-all duration-700 ease-out ${isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              style={{ transitionDelay: '300ms' }}
            >
              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-6">
                {t('description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-black text-white px-6 py-3 text-sm font-semibold hover:bg-gray-800 transition-colors rounded-lg">
                  {t('viewProjects')}
                </button>
                <button className="border-2 border-black text-black px-6 py-3 text-sm font-semibold hover:bg-black hover:text-white transition-colors rounded-lg">
                  {t('aboutUs')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Projects Container */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-2 gap-x-6 md:gap-x-12 lg:gap-x-24 xl:gap-x-40 gap-y-0 max-w-7xl mx-auto">
            {projects.map((project, index) => {
              const isVisible = visibleProjects.has(index);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={project.id}
                  ref={(el) => { projectRefs.current[index] = el; }}
                  className={`transition-all duration-600 ease-out ${!isEven ? 'md:mt-[750px]' : ''} ${isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                    }`}
                >
                  <div className="relative h-[600px] md:h-[800px] rounded-3xl overflow-hidden bg-white shadow-lg group">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex justify-between items-center mt-4 px-4 py-3 backdrop-blur-sm bg-white/30 rounded-lg">
                    <h3 className="text-lg font-bold text-black">{project.title}</h3>
                    <p className="text-lg text-black">{project.category}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
