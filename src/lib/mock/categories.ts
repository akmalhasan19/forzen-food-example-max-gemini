import type { Category } from "@/types/domain";

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-001",
    slug: "frozen-meals",
    name: "Frozen Meals",
    description: "Ready-to-eat frozen meals for quick and easy dinners",
    imageUrl: "/images/products/frozen-meals.jpg",
    isActive: true,
  },
  {
    id: "cat-002",
    slug: "seafood",
    name: "Seafood",
    description: "Premium frozen seafood including fish, shrimp, and shellfish",
    imageUrl: "/images/products/seafood.jpg",
    isActive: true,
  },
  {
    id: "cat-003",
    slug: "meats",
    name: "Meats & Poultry",
    description: "High-quality frozen meats and poultry products",
    imageUrl: "/images/products/meats.jpg",
    isActive: true,
  },
  {
    id: "cat-004",
    slug: "vegetables",
    name: "Vegetables",
    description: "Flash-frozen vegetables that retain nutrients and flavor",
    imageUrl: "/images/products/vegetables.jpg",
    isActive: true,
  },
  {
    id: "cat-005",
    slug: "desserts",
    name: "Desserts & Ice Cream",
    description: "Frozen desserts, ice cream, and sweet treats",
    imageUrl: "/images/products/desserts.jpg",
    isActive: true,
  },
  {
    id: "cat-006",
    slug: "healthy-essentials",
    name: "Healthy Essentials",
    description: "Nutritious frozen smoothie packs, bowls, and health foods",
    imageUrl: "/images/products/healthy.jpg",
    isActive: true,
  },
];
