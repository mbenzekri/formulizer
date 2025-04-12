import "./lib/logger"
import "./inputs/enum/fz-enum-select";
import "./inputs/enum/fz-enum-check";
import "./inputs/enum/fz-enum-typeahead";

import "./inputs/misc/fz-input-const";
import "./inputs/primitive/fz-input-boolean";
import { FzInputFloat,FzInputInteger,FzInputRange} from  "./inputs/primitive/fz-input-number";
import "./inputs/primitive/fz-input-string";
import "./inputs/primitive/fz-input-color";
import "./inputs/primitive/fz-input-date";
import "./inputs/primitive/fz-input-datetime";
import "./inputs/primitive/fz-input-time";
import "./inputs/primitive/fz-input-mask";
import "./inputs/primitive/fz-input-textarea";
import "./inputs/misc/fz-input-signature";
import "./inputs/primitive/fz-input-uuid";
import "./inputs/misc/fz-input-location";
import "./inputs/misc/fz-input-doc";
import "./inputs/misc/fz-input-md";

import "./collections/fz-array";
import "./collections/fz-object";
import "./collections/fz-enum-array";

import "./components/dialog"
import "./components/fz-barcode-dlg"
import "./components/fz-photo-dlg"
import "./components/fz-item-dlg"

import { FzForm } from "./fz-form";
import { FzMarkdownIt } from "./components/markdown-it";

// just to avoid unused error;
FzInputFloat;
FzInputInteger;
FzInputRange;

export { FzForm, FzMarkdownIt }