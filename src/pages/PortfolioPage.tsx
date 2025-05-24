import { ProjectCard } from "@/components";
import { projects } from "@/utils";
import { useTranslation } from "react-i18next";

export const PortfolioPage = () => {
  const { t } = useTranslation();

  return (
    <section className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto py-10 px-8">
        <h1 className="text-4xl font-bold text-center mb-6">
          {t("portfolioPage.title")}
        </h1>
        <p className="text-center max-w-2xl mx-auto mb-6">
          {t("portfolioPage.description")}
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          {t("portfolioPage.ourProjects")}
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};
