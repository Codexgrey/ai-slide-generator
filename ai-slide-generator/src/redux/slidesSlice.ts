import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

export interface Slide {
  id: string
  title: string
  content: string[]
  imageUrl?: string
  notes?: string
}

interface SlidesState {
  slides: Slide[]
  activeSlideIndex: number
  isGenerating: boolean
}

const initialState: SlidesState = {
  slides: [],
  activeSlideIndex: 0,
  isGenerating: false,
}

interface GenerateSlidesParams {
  input: string;
  slideCount: number;
  includeImages: boolean;
  style: string;
}

export const generateSlides = createAsyncThunk<Slide[], GenerateSlidesParams>(
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
      return data.slides as Slide[];
    } catch (err: unknown) {
      let message = 'An error occurred';
      if (err instanceof Error) {
        message = err.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const slidesSlice = createSlice({
  name: 'slides',
  initialState,
  reducers: {
    setSlides(state, action: PayloadAction<Slide[]>) {
      state.slides = action.payload
    },
    updateSlide(state, action: PayloadAction<{ index: number; slide: Partial<Slide> }>) {
      const { index, slide } = action.payload
      state.slides[index] = { ...state.slides[index], ...slide }
    },
    setActiveSlideIndex(state, action: PayloadAction<number>) {
      state.activeSlideIndex = action.payload
    },
    resetSlides(state) {
      state.slides = []
      state.activeSlideIndex = 0
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(generateSlides.pending, (state) => {
        state.isGenerating = true;
      })
      .addCase(generateSlides.fulfilled, (state, action) => {
        state.slides = action.payload;
        state.isGenerating = false;
      })
      .addCase(generateSlides.rejected, (state) => {
        state.isGenerating = false;
      });
  },
})

export const {
  setSlides,
  updateSlide,
  setActiveSlideIndex,
  resetSlides,
} = slidesSlice.actions

export default slidesSlice.reducer
