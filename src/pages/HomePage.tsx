import { WebDevelopmentSVG } from "@/assets/svg";
import { CustomBtn, ProductCard } from "@/components";
import { products } from "@/utils";
import { useTranslation } from "react-i18next";

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <section className="h-full overflow-auto">
      <section className="min-h-[calc(100dvh-4rem)] flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight ">
            {t("homePage.hero.title")}
          </h1>
          <p className="mt-4 text-lg">{t("homePage.hero.subtitle")}</p>
          <div className="mt-6 flex gap-4">
            <CustomBtn
              text={t("homePage.hero.portfolio")}
              size="lg"
              to="/portfolio"
              as="link"
            />
            <CustomBtn
              variant="secondary"
              text={t("homePage.hero.contactUs")}
              size="lg"
              to="/contact"
              as="link"
            />
          </div>
        </div>
        <div className="md:w-1/2 md:mt-0">
          <WebDevelopmentSVG className="w-full h-auto filter grayscale-50" />
        </div>
      </section>

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

      <section className="py-16 flex flex-col justify-center items-center text-center gap-4 px-6">
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
