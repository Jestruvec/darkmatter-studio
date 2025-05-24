import { ProductCard } from "@/components";
import { products } from "@/utils";
import { useTranslation } from "react-i18next";

export const ProductsPage = () => {
  const { t } = useTranslation();

  return (
    <section className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto py-10 px-8">
        <h1 className="text-4xl font-bold text-center mb-6">
          {t("productsPage.title")}
        </h1>
        <p className="text-center max-w-2xl mx-auto my-10">
          {t("productsPage.description")}
        </p>

        <h2 className="text-2xl font-semibold text-center mb-10">
          {t("productsPage.ourProducts")}
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};
