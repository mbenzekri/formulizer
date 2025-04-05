import "./inputs/enum/fz-enum-select";
import "./inputs/enum/fz-enum-check";
import "./inputs/enum/fz-enum-typeahead";

import "./inputs/fz-input-const";
import "./inputs/fz-input-boolean";
import { FzInputFloat,FzInputInteger,FzInputRange} from  "./inputs/fz-input-number";
import "./inputs/fz-input-string";
import "./inputs/fz-input-color";
import "./inputs/fz-input-date";
import "./inputs/fz-input-datetime";
import "./inputs/fz-input-time";
import "./inputs/fz-input-mask";
import "./inputs/fz-input-textarea";
import "./inputs/fz-input-signature";
import "./inputs/fz-input-uuid";
import "./inputs/fz-input-location";
import "./inputs/fz-input-doc";
import "./inputs/fz-input-md";

import "./collections/fz-array";
import "./collections/fz-object";
import "./collections/fz-enum-array";

import "./components/dialog"
import "./components/fz-barcode-dlg"
import "./components/fz-photo-dlg"
import "./components/fz-item-dlg"

import "./lib/logger"
import { FzForm } from "./fz-form";
import { FzMarkdownIt } from "./components/markdown-it";

// just to avoid unused error;
FzInputFloat;
FzInputInteger;
FzInputRange;

export { FzForm, FzMarkdownIt }