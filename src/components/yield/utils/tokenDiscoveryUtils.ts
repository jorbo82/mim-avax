
export const formatAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatPrice = (price: number) => {
  if (!price || price === 0) return 'N/A';
  if (price < 0.01) return `$${price.toFixed(6)}`;
  return `$${price.toFixed(4)}`;
};

export const getProtocolColor = (protocol: string) => {
  const colors: { [key: string]: string } = {
    'apex-defi': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'pharaoh': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'lfj': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'benqi': 'bg-green-500/20 text-green-400 border-green-500/30'
  };
  return colors[protocol] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
};

export const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

export const getEnhancedPoolName = (pool: any, protocol: any) => {
  // Try to get token symbol from various sources
  let tokenSymbol = '';
  
  // 1. From pool metadata tokenInfo
  if (pool.metadata?.tokenInfo?.symbol) {
    tokenSymbol = pool.metadata.tokenInfo.symbol;
  }
  // 2. From DexScreener data in metadata
  else if (pool.metadata?.dexScreenerData?.baseToken?.symbol) {
    tokenSymbol = pool.metadata.dexScreenerData.baseToken.symbol;
  }
  
  // Format the pool name based on available information
  if (tokenSymbol) {
    // For different pool types, format appropriately
    if (pool.type === 'liquidity_pool' || pool.type === 'amm') {
      // If we have pair information, show as TOKEN/PAIR
      const quoteSymbol = pool.metadata?.dexScreenerData?.quoteToken?.symbol || 'AVAX';
      return `${tokenSymbol}/${quoteSymbol} Pool`;
    } else if (pool.type === 'native_token' || pool.type === 'erc314') {
      return `${tokenSymbol} Native Pool`;
    } else if (pool.type === 'wrapped_token') {
      return `${tokenSymbol} Wrapped Pool`;
    } else {
      return `${tokenSymbol} ${pool.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
    }
  }
  
  // Fallback to original pool name
  return pool.name || 'Unknown Pool';
};

export const openExternalLink = (url: string) => {
  try {
    // Try to open in a new window first
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    
    // If popup is blocked, fallback to location.href
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // In sandboxed iframe, use parent window if available
      if (window.parent && window.parent !== window) {
        window.parent.location.href = url;
      } else {
        window.location.href = url;
      }
    }
  } catch (error) {
    console.error('Failed to open external link:', error);
    // Final fallback
    window.location.href = url;
  }
};
