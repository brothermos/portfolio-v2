export type QuoteIcon = 'thunder' | 'smile' | 'heart';

export interface QuoteSegment {
  text: string;
  icon: QuoteIcon;
}

export const QUOTE_SEGMENTS: QuoteSegment[] = [
  { text: 'I build modern web experiences', icon: 'thunder' },
  { text: 'with clean code', icon: 'smile' },
  { text: 'and thoughtful design.', icon: 'heart' },
];

export const QUOTE_DESCRIPTION =
  "Great products don't just work, they feel right. Just code, curiosity, and a lot of attention to detail.";

export interface QuoteTag {
  label: string;
  position: string;
  rotate: number;
  color: string;
  shadow: string;
}
