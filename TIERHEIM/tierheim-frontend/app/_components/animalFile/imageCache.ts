const cache = new Map<string, string>();

// src/util/imageCache.ts

// Globaler Blob-Cache pro Tier-ID
export const imageBlobCache: Record<string, string> = {};

// Tracker für laufende Requests
export const imageBlobPromises: Record<string, Promise<string>> = {};