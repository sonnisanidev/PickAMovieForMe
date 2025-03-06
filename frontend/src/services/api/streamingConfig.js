const STREAMING_API_KEY = process.env.REACT_APP_STREAMING_API_KEY;
const STREAMING_BASE_URL = 'https://streaming-availability.p.rapidapi.com';

export const STREAMING_ENDPOINTS = {
  GET_AVAILABILITY: `${STREAMING_BASE_URL}/get`,
  SEARCH_TITLES: `${STREAMING_BASE_URL}/search/title`
};

export const STREAMING_HEADERS = {
  'X-RapidAPI-Key': STREAMING_API_KEY,
  'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
};

// Supported streaming services
export const STREAMING_SERVICES = {
  NETFLIX: 'netflix',
  PRIME: 'prime',
  DISNEY: 'disney',
  HULU: 'hulu',
  HBO: 'hbo',
  PARAMOUNT: 'paramount',
  PEACOCK: 'peacock',
  APPLE: 'apple',
  MUBI: 'mubi',
  SHOWTIME: 'showtime'
};

// Supported countries for streaming data
export const STREAMING_COUNTRIES = {
  US: 'us',
  UK: 'gb',
  CA: 'ca',
  DE: 'de',
  FR: 'fr',
  ES: 'es',
  IT: 'it',
  IN: 'in',
  JP: 'jp',
  KR: 'kr',
};

// Service display names and icons
export const STREAMING_SERVICE_INFO = {
  netflix: {
    name: 'Netflix',
    icon: '🔴',
    color: 'bg-red-600',
    textColor: 'text-white'
  },
  prime: {
    name: 'Prime Video',
    icon: '📦',
    color: 'bg-blue-500',
    textColor: 'text-white'
  },
  disney: {
    name: 'Disney+',
    icon: '✨',
    color: 'bg-blue-700',
    textColor: 'text-white'
  },
  hulu: {
    name: 'Hulu',
    icon: '🟢',
    color: 'bg-green-500',
    textColor: 'text-white'
  },
  hbo: {
    name: 'HBO Max',
    icon: '🟣',
    color: 'bg-purple-600',
    textColor: 'text-white'
  },
  paramount: {
    name: 'Paramount+',
    icon: '⭐',
    color: 'bg-blue-800',
    textColor: 'text-white'
  },
  peacock: {
    name: 'Peacock',
    icon: '🦚',
    color: 'bg-yellow-500',
    textColor: 'text-black'
  },
  apple: {
    name: 'Apple TV+',
    icon: '🍎',
    color: 'bg-gray-800',
    textColor: 'text-white'
  },
  mubi: {
    name: 'MUBI',
    icon: '🎬',
    color: 'bg-black',
    textColor: 'text-white'
  },
  showtime: {
    name: 'Showtime',
    icon: '🎭',
    color: 'bg-red-700',
    textColor: 'text-white'
  }
};

// Utility functions
export const getServiceInfo = (serviceId) => {
  const service = serviceId.toLowerCase();
  return STREAMING_SERVICE_INFO[service] || {
    name: serviceId,
    icon: '🎥',
    color: 'bg-gray-500',
    textColor: 'text-white'
  };
};

export const getCountryName = (countryCode) => {
  const countryNames = {
    us: 'United States',
    gb: 'United Kingdom',
    ca: 'Canada',
    de: 'Germany',
    fr: 'France',
    es: 'Spain',
    it: 'Italy',
    in: 'India',
    jp: 'Japan',
    kr: 'South Korea'
  };
  return countryNames[countryCode.toLowerCase()] || countryCode.toUpperCase();
};
