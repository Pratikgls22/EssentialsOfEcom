import { removeCookie } from './cookie';

export const formatError = (error) => {
  const status = error?.status || error?.response?.status;

  if ([400, 401, 404, 409, 429, 423, 500].includes(status)) {
    const data = error.response?.data;
    const message = data?.message;

    // Check for custom error format
    if (data?.data?.error) {
      if (typeof data.data.error === 'string') {
        return data.data.error;
      } else if (typeof data.data.error === 'object') {
        if (Array.isArray(data.data.error)) {
          return data.data.error.join(',');
        }
        return message;
      } else {
        return message;
      }
    } else {
      return message || 'An error occurred'; // Fallback message
    }
  } else if (status === 403) {
    removeCookie();
    window.location.href = '/';
  }

  return 'An unexpected error occurred'; // Default fallback
};
