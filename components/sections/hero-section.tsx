'use client';

import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Home } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';
import { FormFieldSelect } from './FormFieldSelect';

export function HeroSection() {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Réinitialiser l'animation
            setIsVisible(false);
            // Déclencher l'animation après un court délai
            setTimeout(() => {
              setIsVisible(true);
            }, 100);
          } else {
            // Réinitialiser quand on quitte la section
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1, // Déclenche quand 10% de la section est visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const [formData, setFormData] = useState({
    location: '',
    price: '',
    housing: '',
  });

  const handleValueChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Options pour les selects
  const locationOptions = [
    { value: 'saint-denis', label: t('hero.form.location.options.saintDenis') },
    { value: 'saint-paul', label: t('hero.form.location.options.saintPaul') },
    { value: 'saint-pierre', label: t('hero.form.location.options.saintPierre') },
    { value: 'le-port', label: t('hero.form.location.options.lePort') },
    { value: 'saint-louis', label: t('hero.form.location.options.saintLouis') },
  ];

  const priceOptions = [
    { value: '100k-500k', label: t('hero.form.price.options.range1') },
    { value: '500k-1m', label: t('hero.form.price.options.range2') },
    { value: '1m-2m', label: t('hero.form.price.options.range3') },
    { value: '2m+', label: t('hero.form.price.options.range4') },
  ];

  const housingOptions = [
    { value: 'appartement', label: t('hero.form.housing.options.appartement') },
    { value: 'maison', label: t('hero.form.housing.options.maison') },
    { value: 'villa', label: t('hero.form.housing.options.villa') },
    { value: 'terrain', label: t('hero.form.housing.options.terrain') },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-red-600 flex flex-col items-start justify-center bg-gradient-to-br from-gray-100 to-gray-200 pt-16 lg:pt-20 pb-20 max-w-full overflow-x-hidden"
    >
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat"></div>
      </div> */}
      {/* Image en fond au bas de la section - Positionnée par rapport à la section */}

      <div className="container  mx-auto px-4 text-center relative z-10 mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="font-black tracking-tighter leading-none">
              {/* First line: MAITRISE + image + EXCELLENCE */}
              <span
                className={`flex flex-row items-center justify-center gap-2 sm:gap-3 md:gap-6 mb-6 sm:mb-8 md:mb-12 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                style={{ transitionDelay: '200ms' }}
              >
                <span className="text-[clamp(2rem,5.5vw,7rem)] sm:text-[clamp(2rem,5.5vw,7rem)] text-gray-900" style={{ fontStretch: 'condensed' }}>
                  {t('hero.maitriser')}
                </span>
                <span className="hidden sm:block relative w-[clamp(100px,25vw,220px)] sm:w-[clamp(120px,18vw,220px)] md:w-[clamp(140px,15vw,220px)] h-[clamp(1.5rem,3vw,5rem)] sm:h-[clamp(1.6rem,3.5vw,5rem)] md:h-[clamp(1.8rem,4vw,5rem)] flex-shrink-0">
                  <Image
                    src="/hero/matrise.png"
                    alt="Construction planning"
                    fill
                    className="object-cover rounded-md sm:rounded-lg"
                  />
                </span>
                <span className="text-[clamp(2rem,5.5vw,7rem)] sm:text-[clamp(2rem,5.5vw,7rem)] text-gray-900" style={{ fontStretch: 'condensed' }}>
                  {t('hero.excellence')}
                </span>
              </span>

              {/* Second line: GROS OEUVRE + image + BATIR */}
              <span
                className={`flex flex-row  items-center justify-center gap-2 sm:gap-3 md:gap-6 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                style={{ transitionDelay: '400ms' }}
              >
                <span className="text-[clamp(2rem,6vw,7rem)] sm:text-[clamp(2rem,6vw,7rem)] text-gray-900 whitespace-nowrap" style={{ fontStretch: 'condensed' }}>
                  {t('hero.grosOeuvre')}
                </span>
                <span className="hidden sm:block relative w-[clamp(120px,30vw,300px)] sm:w-[clamp(150px,23vw,300px)] md:w-[clamp(180px,20vw,300px)] h-[clamp(1.5rem,4vw,5rem)] sm:h-[clamp(1.6rem,4.5vw,5rem)] md:h-[clamp(1.8rem,4.5vw,5rem)] flex-shrink-0">
                  <Image
                    src="/hero/batir.png"
                    alt="Building construction"
                    fill
                    className="object-cover rounded-md sm:rounded-lg"
                  />
                </span>
                <span className="text-[clamp(2rem,6vw,7rem)] sm:text-[clamp(2rem,6vw,7rem)] text-gray-900" style={{ fontStretch: 'condensed' }}>
                  {t('hero.batir')}
                </span>
              </span>
            </h1>
          </div>

          {/* Section avec texte et formulaire */}
          <div className="relative w-full mx-auto mt-12">
            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10 px-4">
              {/* Bloc gauche - Texte */}
              <div
                className={`w-full md:w-auto md:flex-[0.8] text-left space-y-4 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                style={{ transitionDelay: '600ms' }}
              >
                <div className="backdrop-blur-md rounded-lg py-6 pl-0 md:pl-10 lg:pl-20">
                  <p className="text-gray-900 leading-relaxed text-md font-medium drop-shadow-lg">
                    {t('hero.description')}
                  </p>
                </div>
              </div>

              {/* Bloc droit - Formulaire */}
              <div
                className={`w-full md:w-auto md:flex-[1.2] bg-white/50 backdrop-blur-md md:bg-white  rounded-lg shadow-lg p-4 min-w-0 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                style={{ transitionDelay: '800ms' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
                  {/* Localisation */}
                  <FormFieldSelect
                    icon={MapPin}
                    label={t('hero.form.location.label')}
                    placeholder={t('hero.form.location.placeholder')}
                    options={locationOptions}
                    value={formData.location}
                    onValueChange={(value) => handleValueChange('location', value)}
                  />

                  {/* Prix */}
                  <FormFieldSelect
                    icon={DollarSign}
                    label={t('hero.form.price.label')}
                    placeholder={t('hero.form.price.placeholder')}
                    options={priceOptions}
                    value={formData.price}
                    onValueChange={(value) => handleValueChange('price', value)}
                  />

                  {/* Logement */}
                  <FormFieldSelect
                    icon={Home}
                    label={t('hero.form.housing.label')}
                    placeholder={t('hero.form.housing.placeholder')}
                    options={housingOptions}
                    value={formData.housing}
                    onValueChange={(value) => handleValueChange('housing', value)}
                  />

                  {/* Bouton */}
                  <Button className="bg-black hover:bg-gray-800 text-white font-bold text-sm px-8 h-[50px] w-full md:w-auto flex items-center justify-center">
                    {t('hero.form.submit')}
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={` w-full  h-[400px] md:h-[550px] lg:h-[700px] -mt-60 md:-mt-50 pointer-events-none z-0 transition-all duration-1200 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        style={{ transitionDelay: '400ms' }}
      >
        <Image
          src="/hero/building.png"
          alt="Building"
          fill
          className="object-cover object-center"
        />
      </div>
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        style={{ transitionDelay: '1000ms' }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
