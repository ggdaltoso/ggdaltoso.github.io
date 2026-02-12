import { type ClassValue, clsx } from 'clsx';

/**
 * Combina classes CSS (útil com Tailwind)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Converte texto em slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]+/g, '-') // Substitui caracteres especiais por -
    .replace(/^-+|-+$/g, ''); // Remove - do início e fim
}

/**
 * Formata data para exibição
 */
export function formatDate(
  dateString: string,
  locale: string = 'pt-BR',
): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calcula tempo de leitura estimado
 */
export function readingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Trunca texto
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}
