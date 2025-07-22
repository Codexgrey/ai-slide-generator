import { Slide } from './slide';

export interface Presentation {
    id: string;
    title: string;
    description?: string;
    slides: Slide[];
    themeId: string;
    userId: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}
