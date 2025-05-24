export interface Product {
  nameKey: string;
  shortDescriptionKey: string;
  longDescriptionKey: string;
  featuresKey: string;
  slug: string;
  technologies?: string[];
  illustration: React.FC<React.SVGProps<SVGSVGElement>> | null;
  category: "servicio" | "producto-digital" | "desarrollo-a-medida";
  priceRange?: string;
}
