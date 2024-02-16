export const ShoeStyle = [
  "Running Shoes",
  "Casual Shoes",
  "Athletic Shoes",
  "Sneakers",
  "Boots",
  "Sandals",
  "Loafers",
  "Slippers",
  "Hiking Boots",
];
export const ShoeSize = ["7", "8", "9", "10"];
export const ShoeColor = ["Red", "Blue", "Green"];
export const ShoeMaterial = ["fabric", "leather"];

// filter

export const ShoeSizeFilters = ShoeSize.map((size) => ({
  text: `Size ${size}`,
  value: size,
}));
export const ShoeColorFilters = ShoeColor.map((color) => ({
  text: color,
  value: color,
}));
export const ShoeMaterialFilters = ShoeMaterial.map((material) => ({
  text: material,
  value: material,
}));
export const styleFilters = ShoeStyle.map((style) => ({
  text: style,
  value: style,
}));
