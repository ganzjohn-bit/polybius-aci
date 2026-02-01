// Clean up XML/HTML artifacts from text
export function cleanArtifacts(text: string): string {
  return text
    // Remove XML tags
    .replace(/<\/?[a-zA-Z_][a-zA-Z0-9_-]*[^>]*>/g, '')
    // Decode HTML entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)))
    // Remove citation markers like [1], [2], etc.
    .replace(/\[\d+\]/g, '')
    // Clean up extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

// Recursively clean all string values in an object
export function cleanObjectStrings(obj: unknown): unknown {
  if (typeof obj === 'string') return cleanArtifacts(obj);
  if (Array.isArray(obj)) return obj.map(cleanObjectStrings);
  if (obj && typeof obj === 'object') {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      cleaned[key] = cleanObjectStrings(value);
    }
    return cleaned;
  }
  return obj;
}
