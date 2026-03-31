import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SectionId = "info" | "about" | "featured" | "contact";
export type ScrapVariant = 1 | 2 | 3;

type UiState = {
  activeSection: SectionId | null;
  sectionVariants: Record<SectionId, ScrapVariant>;
};

const initialState: UiState = {
  activeSection: null,
  sectionVariants: {
    info: 1,
    about: 2,
    featured: 3,
    contact: 1,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveSection(state, action: PayloadAction<UiState["activeSection"]>) {
      state.activeSection = action.payload;
    },
    cycleSectionVariant(state, action: PayloadAction<SectionId>) {
      const key = action.payload;
      const current = state.sectionVariants[key];
      state.sectionVariants[key] = current === 3 ? 1 : ((current + 1) as ScrapVariant);
    },
  },
});

export const { setActiveSection, cycleSectionVariant } = uiSlice.actions;
export default uiSlice.reducer;

