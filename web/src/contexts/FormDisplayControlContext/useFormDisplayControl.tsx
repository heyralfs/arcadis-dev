import { useContext } from "react";
import { FormDisplayControlContext } from "./";

export function useFormDisplayControl() {
	return useContext(FormDisplayControlContext);
}
