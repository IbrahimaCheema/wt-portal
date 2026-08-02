const R2_DOMAIN = 'https://docs.western.com.pk';

export function getMediaUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${R2_DOMAIN}${cleanPath}`;
}
