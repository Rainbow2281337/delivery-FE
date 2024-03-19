import en from "./en.json";
import ua from "./ua.json";

export const translate = (key: string, language: string): string => {
  let langData: { [key: string]: string } = {};

  if (language === "English") {
    langData = en;
  } else if (language === "Ukrainian") {
    langData = ua;
  }

  return langData[key];
};
