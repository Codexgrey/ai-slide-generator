// mapping of theme presets for different categories
import { Theme } from '@/types/theme';

export const themePresets: Record<string, Theme> = {
    medical: {
        id: 'medical',
        name: 'Medical Green',
        category: 'medical',
        primaryColor: '#2e7d32',
        secondaryColor: '#66bb6a',
        backgroundColor: '#e8f5e9',
        textColor: '#1b5e20',
        fontFamily: 'Helvetica, sans-serif',
    },

    professional: {
        id: 'professional',
        name: 'Corporate Blue',
        category: 'business',
        primaryColor: '#0d47a1',
        secondaryColor: '#1976d2',
        backgroundColor: '#e3f2fd',
        textColor: '#0d47a1',
        fontFamily: 'Segoe UI, sans-serif',
    },

    education: {
        id: 'education',
        name: 'Bright Education',
        category: 'education',
        primaryColor: '#f9a825',
        secondaryColor: '#ffca28',
        backgroundColor: '#fff8e1',
        textColor: '#e65100',
        fontFamily: 'Comic Sans MS, cursive, sans-serif',
    },

    technology: {
        id: 'technology',
        name: 'Futuristic Dark',
        category: 'technology',
        primaryColor: '#00bcd4',
        secondaryColor: '#00acc1',
        backgroundColor: '#121212',
        textColor: '#e0f7fa',
        fontFamily: 'Roboto Mono, monospace',
    },
    
    creative: {
        id: 'creative',
        name: 'Vibrant Expressive',
        category: 'creative',
        primaryColor: '#ec407a',
        secondaryColor: '#ab47bc',
        backgroundColor: '#fce4ec',
        textColor: '#880e4f',
        fontFamily: '"Brush Script MT", cursive',
    },
};
