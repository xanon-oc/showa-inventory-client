export const historyFuncForHistorySales = (
  key: string,
  setState: (value: string) => void
) => {
  // Set state value based on the active key
  const keyToStateMapping: Record<string, string> = {
    "1": "daily",
    "2": "weekly",
    "3": "monthly",
    "4": "yearly",
  };

  const stateValue = keyToStateMapping[key];

  if (stateValue) {
    setState(stateValue);
  }
};
