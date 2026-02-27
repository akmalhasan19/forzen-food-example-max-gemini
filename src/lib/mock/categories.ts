import type { Category } from "@/types/domain";

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-001",
    slug: "frozen-meals",
    name: "Makanan Beku",
    description: "Makanan beku siap saji untuk makan malam yang cepat dan mudah",
    imageUrl: "/images/products/frozen-meals.jpg",
    isActive: true,
  },
  {
    id: "cat-002",
    slug: "seafood",
    name: "Makanan Laut",
    description: "Makanan laut beku premium termasuk ikan, udang, dan kerang",
    imageUrl: "/images/products/seafood.jpg",
    isActive: true,
  },
  {
    id: "cat-003",
    slug: "meats",
    name: "Daging & Unggas",
    description: "Produk daging dan unggas beku berkualitas tinggi",
    imageUrl: "/images/products/meats.jpg",
    isActive: true,
  },
  {
    id: "cat-004",
    slug: "vegetables",
    name: "Sayuran",
    description: "Sayuran beku kilat yang menjaga nutrisi dan rasa",
    imageUrl: "/images/products/vegetables.jpg",
    isActive: true,
  },
  {
    id: "cat-005",
    slug: "desserts",
    name: "Dessert & Es Krim",
    description: "Dessert beku, es krim, dan camilan manis",
    imageUrl: "/images/products/desserts.jpg",
    isActive: true,
  },
  {
    id: "cat-006",
    slug: "healthy-essentials",
    name: "Kebutuhan Sehat",
    description: "Paket smoothie beku bergizi, mangkuk, dan makanan sehat",
    imageUrl: "/images/products/healthy.jpg",
    isActive: true,
  },
];
