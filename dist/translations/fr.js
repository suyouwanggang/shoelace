import {
  registerTranslation
} from "../chunks/chunk.CCTU25PV.js";
import "../chunks/chunk.FHAP4LMI.js";

// src/translations/fr.ts
var translation = {
  $code: "fr",
  $name: "Fran\xE7ais",
  $dir: "ltr",
  close: "Fermer",
  copy: "Copier",
  progress: "Progr\xE8s",
  resize: "Redimensionner",
  scroll_to_end: `Faire d\xE9filer jusqu'\xE0 la fin`,
  scroll_to_start: `Faire d\xE9filer jusqu'au d\xE9but`,
  select_a_color_from_the_screen: `S\xE9lectionnez une couleur \xE0 l'\xE9cran`,
  toggle_color_format: "Changer le format de couleur"
};
registerTranslation(translation);
var fr_default = translation;
export {
  fr_default as default
};
