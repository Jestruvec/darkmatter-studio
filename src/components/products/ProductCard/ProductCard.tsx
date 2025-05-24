import { Product } from "@/types";
import { TFunction } from "i18next";

interface Props {
  t: TFunction<"translation", undefined>;
  product: Product;
  isPreview?: boolean;
}

export const ProductCard = ({ t, product, isPreview = false }: Props) => {
  const IllustrationSVG = product.illustration;
  const features = t(product.featuresKey, { returnObjects: true });
  const safeFeatures = Array.isArray(features) ? features.slice(0, 3) : [];

  return (
    <article className="p-4 text-center bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg">
      <header>
        {IllustrationSVG && (
          <IllustrationSVG className="w-full h-48 object-contain" />
        )}
        <h3 className="mt-4 text-lg font-semibold">{t(product.nameKey)}</h3>
      </header>

      <section>
        <p className="mt-2 text-sm">
          {t(
            isPreview ? product.shortDescriptionKey : product.longDescriptionKey
          )}
        </p>
        {product.priceRange && (
          <p className="mt-1 text-sm font-medium">{product.priceRange}</p>
        )}
      </section>

      <footer className="mt-3 text-sm">
        <ul className="text-left list-disc list-inside">
          {safeFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </footer>
    </article>
  );
};
