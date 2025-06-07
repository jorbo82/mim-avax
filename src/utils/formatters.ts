
export const formatPrice = (price: string | number): string => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return '$0.00';
  
  if (num < 0.01) {
    return `$${num.toFixed(6)}`;
  } else if (num < 1) {
    return `$${num.toFixed(4)}`;
  } else {
    return `$${num.toFixed(2)}`;
  }
};

export const formatLargeNumber = (num: number): string => {
  if (isNaN(num)) return '0';
  
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`;
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`;
  } else if (num >= 1e3) {
    return `${(num / 1e3).toFixed(2)}K`;
  } else {
    return num.toFixed(2);
  }
};

export const formatPercentage = (percent: number): string => {
  if (isNaN(percent)) return '0.00%';
  return `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`;
};
