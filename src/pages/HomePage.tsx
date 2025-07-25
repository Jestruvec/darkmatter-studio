import {
  CustomBtn,
  ProductCard,
  ProjectCard,
  TesseractScene,
} from "@/components";
import { FaReact, FaNodeJs, FaAngular } from "react-icons/fa";
import { SiVuedotjs, SiNextdotjs, SiDotnet } from "react-icons/si";
import { products, projects } from "@/utils";
import { useTranslation } from "react-i18next";

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <section className="overflow-auto h-full">
      {/* Hero Section */}
      <section className="relative flex items-center h-[calc(100dvh-4rem)] px-8">
        <div className="text-center mx-auto max-w-[500px] flex flex-col gap-6">
          <h1 className="text-4xl font-bold">{t("homePage.hero.title")}</h1>
          <p className="text-2xl font-semibold">
            {t("homePage.hero.subtitle")}
          </p>

          <div>
            <CustomBtn
              variant="secondary"
              text={t("homePage.hero.contactUs")}
              size="lg"
              to="/contact"
              as="link"
            />
          </div>
        </div>

        <div className="absolute inset-0 -z-10">
          <TesseractScene />
        </div>
      </section>

      {/* Sección de Confianza y Filosofía para Equipo */}
      <section className="bg-gray-50 dark:bg-transparent  py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold">{t("homePage.trust.title")}</h2>
          <p className="mt-4 text-lg ">{t("homePage.trust.description")}</p>

          <div className="mt-12">
            <CustomBtn
              as="link"
              to="/portfolio"
              size="lg"
              text={t("homePage.trust.viewPortfolio")}
            />
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center ">
            {t("homePage.services.title")}
          </h2>
          <p className="text-center mt-2">{t("homePage.services.subtitle")}</p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {products.slice(0, 3).map((product, index) => (
              <ProductCard key={index} product={product} isPreview t={t} />
            ))}
          </div>

          <div className="text-center mt-8">
            <CustomBtn
              as="link"
              to="/products"
              text={t("homePage.services.allServices")}
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Portfolio Destacado */}
      <section className="bg-gray-50 dark:bg-transparent py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center">
            {t("homePage.portfolio.title")}
          </h2>
          <p className="text-center mt-2">{t("homePage.portfolio.subtitle")}</p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {projects.slice(1).map((project, idx) => (
              <ProjectCard key={idx} project={project} t={t} />
            ))}
          </div>
          <div className="text-center mt-8">
            <CustomBtn
              as="link"
              to="/portfolio"
              text={t("homePage.portfolio.allProjects")}
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Tecnologías */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold">{t("homePage.tech.title")}</h2>
          <p className="mt-2">{t("homePage.tech.subtitle")}</p>

          <div className="flex flex-wrap justify-center gap-12 mt-12 text-6xl ">
            <div className="flex flex-col items-center gap-2">
              <FaReact />
              <p className="mt-2 font-semibold text-lg">React</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <SiVuedotjs />
              <p className="mt-2 font-semibold text-lg">Vue.js</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FaAngular />
              <p className="mt-2 font-semibold text-lg">Angular</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <SiNextdotjs />
              <p className="mt-2 font-semibold text-lg">Next.js</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FaNodeJs />
              <p className="mt-2 font-semibold text-lg">Node.js</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <SiDotnet />
              <p className="mt-2 font-semibold text-lg">C#</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action final */}
      <section className="bg-gray-50 dark:bg-transparent py-16 flex flex-col justify-center items-center text-center gap-4 px-6">
        <h2 className="text-3xl font-bold">
          {t("homePage.footer.readyToStart")}
        </h2>
        <p className="mt-2 text-lg">{t("homePage.footer.schedule")}</p>
        <CustomBtn
          as="link"
          to="/contact"
          variant="secondary"
          size="lg"
          text={t("homePage.footer.contactUs")}
        />
      </section>
    </section>
  );
};
