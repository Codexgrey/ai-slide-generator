export interface Slide {
    id: string;
    title: string;
    content: string[];
    imageUrl?: string;
    notes?: string;
    order: number;
    presentationId: string;
}
