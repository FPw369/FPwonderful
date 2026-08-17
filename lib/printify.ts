// Printify REST API Integration Wrapper for FPwonderful

export interface PrintifyVariant {
  id: number;
  title: string;
  price: number;
  is_enabled: boolean;
  options: { [key: string]: string | number };
}

export interface PrintifyImage {
  src: string;
  is_default: boolean;
  position: string;
}

export interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: PrintifyImage[];
  variants: PrintifyVariant[];
  visible: boolean;
  priceFormatted?: string;
  primaryImage?: string;
  externalUrl?: string;
}

const PRINTIFY_BASE_URL = 'https://api.printify.com/v1';

export async function getPrintifyShopId(token: string): Promise<string | null> {
  try {
    const res = await fetch(`${PRINTIFY_BASE_URL}/shops.json`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 }, // Cache shop ID for 5 mins
    });

    if (!res.ok) return null;
    const shops = await res.json();
    if (Array.isArray(shops) && shops.length > 0) {
      // Find shop matching 'FPwonderful' or use the first storefront/shop
      const fpShop = shops.find((s: { title?: string }) =>
        s.title?.toLowerCase().includes('fpwonderful')
      );
      if (fpShop) return fpShop.id.toString();
      return shops[0].id.toString();
    }
    return null;
  } catch {
    return null;
  }
}

export async function fetchPrintifyProducts(): Promise<{
  products: PrintifyProduct[];
  isLive: boolean;
  error?: string;
}> {
  const token = process.env.PRINTIFY_API_TOKEN;
  let shopId = process.env.PRINTIFY_SHOP_ID;

  if (!token) {
    return {
      products: FALLBACK_MERCH_PRODUCTS,
      isLive: false,
      error: 'PRINTIFY_API_TOKEN is not configured.',
    };
  }

  try {
    if (!shopId) {
      shopId = (await getPrintifyShopId(token)) || undefined;
    }

    if (!shopId) {
      return {
        products: FALLBACK_MERCH_PRODUCTS,
        isLive: false,
        error: 'No Printify shop found for the provided API token.',
      };
    }

    const res = await fetch(`${PRINTIFY_BASE_URL}/shops/${shopId}/products.json`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // Revalidate every 60 seconds for live updates
    });

    if (!res.ok) {
      const errText = await res.text();
      return {
        products: FALLBACK_MERCH_PRODUCTS,
        isLive: false,
        error: `Printify API error (${res.status}): ${errText}`,
      };
    }

    const data = await res.json();
    const rawProducts = data.data || (Array.isArray(data) ? data : []);

    const formattedProducts: PrintifyProduct[] = rawProducts
      .filter((p: { visible?: boolean }) => p.visible !== false)
      .map((p: {
        id: string | number;
        title: string;
        description: string;
        tags: string[];
        images: { src: string; is_default?: boolean; position?: string }[];
        variants: { id: number; title: string; price: number; is_enabled: boolean; options?: { [key: string]: string | number } }[];
        visible?: boolean;
      }) => {
        // Find minimum price from enabled variants
        const enabledVariants = p.variants?.filter((v) => v.is_enabled) || [];
        const minPriceCents = enabledVariants.length > 0
          ? Math.min(...enabledVariants.map((v) => v.price))
          : p.variants?.[0]?.price || 0;

        const primaryImage =
          p.images?.find((img) => img.is_default)?.src ||
          p.images?.[0]?.src ||
          '/images/logo.png';

        // Clean HTML description from Printify
        const cleanDescription = p.description
          ? p.description.replace(/<[^>]*>?/gm, '').trim()
          : '';

        return {
          id: p.id.toString(),
          title: p.title,
          description: cleanDescription,
          tags: p.tags || [],
          images: p.images || [],
          variants: p.variants || [],
          visible: p.visible !== false,
          priceFormatted: minPriceCents > 0 ? `$${(minPriceCents / 100).toFixed(2)}` : 'Inquire',
          primaryImage,
        };
      });

    return {
      products: formattedProducts.length > 0 ? formattedProducts : FALLBACK_MERCH_PRODUCTS,
      isLive: true,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown connection error';
    return {
      products: FALLBACK_MERCH_PRODUCTS,
      isLive: false,
      error: errorMsg,
    };
  }
}

export const FALLBACK_MERCH_PRODUCTS: PrintifyProduct[] = [
  {
    id: 'merch-01',
    title: 'DOOMgang☥ Heavyweight Studio Hoodie',
    description: 'Ultra-heavy French terry cotton with embroidered celadon DOOMgang☥ insignia. Custom relaxed fit.',
    tags: ['Apparel', '450 GSM', 'Limited'],
    images: [{ src: '/images/logo.png', is_default: true, position: 'front' }],
    variants: [{ id: 101, title: 'L / Charcoal', price: 7800, is_enabled: true, options: {} }],
    visible: true,
    priceFormatted: '$78.00',
    primaryImage: '/images/logo.png',
  },
  {
    id: 'merch-02',
    title: 'Sound With Intention // Mineral Wash Tee',
    description: '100% heavyweight combed cotton. Vintage charcoal wash with subtle gold back-print manifesto.',
    tags: ['Apparel', 'Vintage Wash', 'Core'],
    images: [{ src: '/images/logo.png', is_default: true, position: 'front' }],
    variants: [{ id: 102, title: 'L / Mineral Wash', price: 3800, is_enabled: true, options: {} }],
    visible: true,
    priceFormatted: '$38.00',
    primaryImage: '/images/logo.png',
  },
  {
    id: 'merch-03',
    title: 'THE VOID CHRONICLES — Limited Cassette',
    description: 'Smoky celadon tinted shell with high-bias cobalt tape. Includes printed lyrics and digital master code.',
    tags: ['Physical Audio', 'Tape', 'Relic'],
    images: [{ src: '/images/logo.png', is_default: true, position: 'front' }],
    variants: [{ id: 103, title: 'Cassette Tape', price: 1800, is_enabled: true, options: {} }],
    visible: true,
    priceFormatted: '$18.00',
    primaryImage: '/images/logo.png',
  },
  {
    id: 'merch-04',
    title: 'Less But Better // Studio Work Cap',
    description: 'Unstructured 6-panel washed twill cap. Tonal embroidery with matte brass closure.',
    tags: ['Headwear', 'Low Profile', 'Essential'],
    images: [{ src: '/images/logo.png', is_default: true, position: 'front' }],
    variants: [{ id: 104, title: 'One Size / Olive', price: 3200, is_enabled: true, options: {} }],
    visible: true,
    priceFormatted: '$32.00',
    primaryImage: '/images/logo.png',
  },
];
