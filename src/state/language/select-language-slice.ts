import { createSlice } from "@reduxjs/toolkit";
import { Language } from "./enum/languageEnum";

interface LanguageState {
  currentLanguage: Language;
}

const storedLanguage = localStorage.getItem("language");
const initialState: LanguageState = {
  currentLanguage:
    storedLanguage && storedLanguage in Language
      ? (storedLanguage as Language)
      : Language.English,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: { payload: Language }) => {
      state.currentLanguage = action.payload;
      localStorage.setItem("language", action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
