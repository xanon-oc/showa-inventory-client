export const polishStatus = ["pending", "processing", "completed"];

export const polishStatusSelect = polishStatus.map((status) => ({
  text: status,
  value: status,
}));
