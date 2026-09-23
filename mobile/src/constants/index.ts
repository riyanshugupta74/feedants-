import { Platform } from 'react-native';

/**
 * API base URL — dynamic for local development vs production
 */
export const API_BASE_URL = __DEV__
  ? Platform.OS === 'android'
    ? 'http://10.0.2.2:5000/api'
    : 'http://localhost:5000/api'
  : 'https://feedants-xc61.onrender.com/api';

export const QUERY_KEYS = {
  competitions: 'competitions',
  competition: 'competition',
  participation: 'participation',
  user: 'user',
  referral: 'referral',
} as const;

export const AUTH_TOKEN_KEY = '@feedants_auth_token';
export const USER_DATA_KEY = '@feedants_user_data';

export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150/0D5C63/FFFFFF?text=F';
export const PLACEHOLDER_AVATAR = 'https://randomuser.me/api/portraits/lego/1.jpg';
