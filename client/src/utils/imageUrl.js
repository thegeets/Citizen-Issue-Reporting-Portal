/**
 * Helper to construct a complete, valid image URL for uploaded issue photos
 * Works seamlessly in both local Vite dev (port 5173/5174) and production environments.
 *
 * @param {string} imagePath - Relative or absolute image path from the database
 * @returns {string} Fully resolved image URL or empty string
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') return '';
  const trimmed = imagePath.trim();
  if (!trimmed) return '';

  // Already an absolute HTTP/HTTPS URL, blob URL, or data URI
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed;
  }

  // Ensure path starts with /
  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;

  // In local Vite development or standard setup, Vite proxies /uploads to backend or direct fallback.
  const backendBase = (import.meta.env.VITE_SERVER_URL || 'https://citizen-issue-reporting-portal.onrender.com').replace(/\/+$/, '');
  if (backendBase) {
    return `${backendBase}${cleanPath}`;
  }

  return cleanPath;
};

export default getImageUrl;
