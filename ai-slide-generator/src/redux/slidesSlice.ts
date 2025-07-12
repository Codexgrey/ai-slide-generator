import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Presentation } from '@/types/presentation';
import { Slide } from '@/types/slide';
import { Theme } from '@/types/theme';

interface SlidesState {
  slides: Slide[];
  currentPresentation: Presentation | null;
  activeSlideIndex: number;
  isGenerating: boolean;
}

const initialState: SlidesState = {
  slides: [],
  currentPresentation: null,
  activeSlideIndex: 0,
  isGenerating: false,
};

interface GenerateSlidesParams {
  topic: string;
  numSlides: number;
  numSlidesWithImages: number; // params updated from includeImages
  theme: Theme;
}

export const generateSlides = createAsyncThunk<Presentation, GenerateSlidesParams>(
  'slides/generateSlides',
  async (params, thunkAPI) => {
    try {
      const res = await fetch('/api/slides/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!res.ok) throw new Error('Failed to generate slides');

      const data = await res.json();

      console.log('[generateSlides.success] Full API response:', data);
      return data.presentation as Presentation;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const slidesSlice = createSlice({
  name: 'slides',
  initialState,
  reducers: {
    setSlides(state, action: PayloadAction<Slide[]>) {
      state.slides = action.payload;
    },
    updateSlide(state, action: PayloadAction<{ index: number; slide: Partial<Slide> }>) {
      const { index, slide } = action.payload;
      state.slides[index] = { ...state.slides[index], ...slide };
    },
    setActiveSlideIndex(state, action: PayloadAction<number>) {
      state.activeSlideIndex = action.payload;
    },
    resetSlides(state) {
      state.slides = [];
      state.currentPresentation = null;
      state.activeSlideIndex = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(generateSlides.pending, (state) => {
        state.isGenerating = true;
      })
      .addCase(generateSlides.fulfilled, (state, action) => {
        const presentation = action.payload;
        state.currentPresentation = {
          ...presentation,
          createdAt: new Date(presentation.createdAt).toISOString(),
          updatedAt: new Date(presentation.updatedAt).toISOString(),
        };
        state.slides = presentation.slides;
        state.isGenerating = false;
        console.log('🔥[generateSlides.fulfilled] Stored theme: ', presentation.theme);
      })
      .addCase(generateSlides.rejected, (state) => {
        state.isGenerating = false;
      });
  },
});

export const {
  setSlides,
  updateSlide,
  setActiveSlideIndex,
  resetSlides,
} = slidesSlice.actions;

export default slidesSlice.reducer;