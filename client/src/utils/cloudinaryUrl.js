export function getCloudinaryUrl(url, { width, quality = 'auto', format = 'auto' } = {}) {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  const parts = [`f_${format}`, `q_${quality}`, ...(width ? [`w_${width}`] : [])];
  const transforms = parts.join(',');
  return url.replace('/upload/', `/upload/${transforms}/`);
}
