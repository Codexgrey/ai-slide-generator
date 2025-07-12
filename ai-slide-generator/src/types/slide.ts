export interface Slide {
  id: string;
  title: string;
  content: string[];
  imageUrl?: string;
  imagePrompt?: string; // added for slides that should have images
  notes?: string;
  order: number;
  presentationId: string;
}
