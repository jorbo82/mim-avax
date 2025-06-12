
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

export const getRiskIcon = (riskLevel: string) => {
  switch (riskLevel) {
    case 'low': return 'Shield';
    case 'medium': return 'AlertTriangle';
    case 'high': return 'AlertCircle';
    default: return 'AlertCircle';
  }
};

export const formatAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatPrice = (price: number) => {
  if (!price || price === 0) return 'N/A';
  if (price < 0.01) return `$${price.toFixed(6)}`;
  return `$${price.toFixed(4)}`;
};

export const openExternalLink = (url: string) => {
  try {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      if (window.parent && window.parent !== window) {
        window.parent.location.href = url;
      } else {
        window.location.href = url;
      }
    }
  } catch (error) {
    console.error('Failed to open external link:', error);
    window.location.href = url;
  }
};

export const renderTokenLogo = (logoURI: string, symbol: string) => {
  if (logoURI && logoURI.startsWith('ipfs://')) {
    return (
      <img 
        src={`https://ipfs.io/ipfs/${logoURI.replace('ipfs://', '')}`}
        alt={symbol}
        className="w-6 h-6 rounded-full"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }
  return null;
};
