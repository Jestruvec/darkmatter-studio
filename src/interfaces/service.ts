import type { FunctionComponent, SVGProps } from 'react';

export interface Service {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  price: string;
  svg: FunctionComponent<SVGProps<SVGSVGElement>>;
}
