import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Slide {
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
})

export const {
  setSlides,
  updateSlide,
  setActiveSlideIndex,
  resetSlides,
} = slidesSlice.actions

export default slidesSlice.reducer
