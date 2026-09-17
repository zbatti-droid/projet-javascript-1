const categoryTranslations: Record<string, string> = {
  "special-edition": "فساتين المناسبات",
  "luxury-collection": "الفساتين الفاخرة",
  "summer-edition": "فساتين صيفية",
  "unique-collection": "تشكيلة مميزة",
};

export const formatCategoryName = (category: string) => {
  return (
    categoryTranslations[category] ||
    category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
};