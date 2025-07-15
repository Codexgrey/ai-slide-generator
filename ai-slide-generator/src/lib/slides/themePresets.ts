// mapping of theme presets for different categories
import { Theme } from '@/types/theme';

export const themePresets: Record<string, Theme> = {
    simple: {
        id: 'simple',
        name: 'Default',
        category: 'general',
        primaryColor: '#007bff',
        secondaryColor: '#ddd',
        backgroundColor: '#ffffff', 
        textColor: '#000000',
        fontFamily: 'Open Sans, sans-serif',
    },

    medical: {
        id: 'medical',
        name: 'Medical Teal',
        category: 'medical',
        primaryColor: '#26a69a',
        secondaryColor: '#4db6ac',
        backgroundColor: '#00695c', 
        textColor: '#e0f2f1',
        fontFamily: 'Verdana, sans-serif',
    },

    professional: {
        id: 'professional',
        name: 'Corporate Blue',
        category: 'business',
        primaryColor: '#1976d2',
        secondaryColor: '#42a5f5',
        backgroundColor: '#0d47a1', 
        textColor: '#e3f2fd', 
        fontFamily: 'Segoe UI, sans-serif',
    },

    education: {
        id: 'education',
        name: 'Bright Education',
        category: 'education',
        primaryColor: '#26c6da',
        secondaryColor: '#4dd0e1',
        backgroundColor: '#00838f', 
        textColor: '#e0f7fa',
        fontFamily: 'Trebuchet MS, sans-serif',
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
        primaryColor: '#ab47bc',
        secondaryColor: '#ce93d8',
        backgroundColor: '#7b1fa2', 
        textColor: '#f3e5f5',
        fontFamily: 'Georgia, serif',
    },
};