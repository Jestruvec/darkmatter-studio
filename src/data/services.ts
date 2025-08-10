import {
  LandingPageSVG,
  EcommercePageSVG,
  AdminPageSVG,
  CustomPageSVG,
  WebMaintenanceSVG,
} from '@/assets/svg';

export const services = [
  {
    id: 1,
    name: 'Desarrollo a la Medida',
    shortDescription: 'Soluciones únicas para necesidades únicas.',
    longDescription:
      'Creamos software web desde cero, completamente adaptado a tu idea, negocio o proceso. Desde MVPs hasta plataformas completas.',
    features: [
      'Análisis de requerimientos',
      'Arquitectura escalable',
      'Entrega modular y evolutiva',
      'Soporte en cada etapa del desarrollo',
    ],
    price: 'Variable segun requerimientos',
    svg: CustomPageSVG,
  },
  {
    id: 2,
    name: 'Landing Page Profesional',
    shortDescription: 'Presencia web rápida y efectiva.',
    longDescription:
      'Creamos landing pages optimizadas para captar clientes, mostrar productos o lanzar campañas. Diseño moderno, responsivo y enfocado en la conversión.',
    features: [
      'Carga rápida',
      'Diseño adaptable (responsive)',
      'Formulario de contacto integrado',
      'Optimización SEO básica',
    ],
    price: 'a partir de 3,000 mxn',
    svg: LandingPageSVG,
  },
  {
    id: 3,
    name: 'Mantenimiento Web',
    shortDescription: 'Tu sitio siempre actualizado y funcionando.',
    longDescription:
      'Brindamos soporte continuo, actualizaciones y mejoras técnicas para mantener tu sitio rápido, seguro y funcional.',
    features: [
      'Actualizaciones periódicas',
      'Mejoras de rendimiento',
      'Revisión de errores',
      'Respaldo y seguridad básica',
    ],
    price: 'a partir de 1,000 mxn',
    svg: WebMaintenanceSVG,
  },
  {
    id: 4,
    name: 'Tienda en Línea',
    shortDescription: 'Vende tus productos 24/7 con una tienda online.',
    longDescription:
      'Diseño e implementación de tiendas en línea con pasarelas de pago, gestión de productos, usuarios y pedidos. Adaptada a tu marca y necesidades.',
    features: [
      'Carrito de compras',
      'Gestión de productos y pedidos',
      'Pasarela de pago (Stripe, PayPal)',
      'Panel administrativo',
    ],
    price: 'a partir de 12,000 mxn',
    svg: EcommercePageSVG,
  },
  {
    id: 5,
    name: 'Plataforma Administrativa',
    shortDescription: 'Control total sobre tu negocio digital.',
    longDescription:
      'Creamos plataformas internas para la gestión eficiente de recursos, usuarios, productos, órdenes y más. Adaptamos el sistema a tu flujo de trabajo.',
    features: [
      'Dashboard personalizado',
      'Gestión de usuarios y roles',
      'Reportes y estadísticas',
      'Acceso seguro con autenticación',
    ],
    price: 'a partir de 20,000 mxn',
    svg: AdminPageSVG,
  },
];
