import { Slide } from './slide';
import { Theme } from './theme';

export interface Presentation {
    id: string;
    title: string;
    description?: string;
    slides: Slide[];
    theme: Theme;
    userId: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}
