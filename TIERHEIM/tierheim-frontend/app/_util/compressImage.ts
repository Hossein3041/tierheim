// utils/compressImage.ts
export async function compressImage(
  file: File,
  opts?: {
    maxWidth?: number;
    maxHeight?: number;
    type?: 'image/webp' | 'image/jpeg';
    quality?: number; // 0..1
  }
): Promise<Blob> {
  const {
    maxWidth = 512,
    maxHeight = 512,
    type = 'image/webp',
    quality = 0.8,
  } = opts || {};

  // createImageBitmap ist schnell & kann Orientation berücksichtigen
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });

  // Zielgröße berechnen (Aspect Ratio erhalten)
  const ratio = Math.min(maxWidth / bitmap.width, maxHeight / bitmap.height, 1);
  const targetW = Math.round(bitmap.width * ratio);
  const targetH = Math.round(bitmap.height * ratio);

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('CanvasContext fehlt');

  // schneller als drawImage in manchen Fällen wäre OffscreenCanvas; hier reicht drawImage
  ctx.drawImage(bitmap, 0, 0, targetW, targetH);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, type, quality)
  );
  if (!blob) throw new Error('Komprimierung fehlgeschlagen');

  return blob;
}
