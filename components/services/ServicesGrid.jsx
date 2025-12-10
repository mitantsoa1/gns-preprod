import CardHeroService from "@/components/CardHeroService"
import AnimatedElement, { StaggerContainer } from "../animations/AnimatedElement";
import { useTranslations } from "next-intl";
const ServicesGrid = () => {
  const t = useTranslations("services.servicesData");
  const servicesData = [
    {
      id: 1,
      title: t("title1"),
      description: t("description1"),
    icon: "/services/fondation-structure.svg",
    bg: "bg-jaune"
    },
    {
      id: 2,
      title: t("title2"),
      description: t("description2"),
      icon: "/services/maconnerie-beton-arme.svg"
    },
     {
      id: 3,
      title: t("title3"),
      description: t("description3"),
      icon: "/services/adaptation.svg",
     bg: "bg-gray-200"
    },
    {
      id: 4,
      title: t("title4"),
      description: t("description4"),
      icon: "/services/finitions.svg",
       bg: "bg-jaune"
    },
    // Vous pouvez ajouter d'autres cartes ici
   
  ];

 return (
    <StaggerContainer 
      staggerDelay={0.5} 
      triggerOnce={false}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 grid-rows-2 gap-6">
        {servicesData.map((service, index) => (
          <AnimatedElement
            key={service.id}
            animation="blur-fade"
            direction="up"
            delay={index * 0.1}
            duration={0.8}
            triggerOnce={false}
            hover={true}
          >
            <CardHeroService
              title={service.title}
              description={service.description}
              icon={service.icon}
              bg={service.bg}
              EnSavoirDAvantage={t("EnSavoirDAvantage")}
            />
          </AnimatedElement>
        ))}
      </div>
    </StaggerContainer>
  );
};

export default ServicesGrid;