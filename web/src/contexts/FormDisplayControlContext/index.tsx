import { createContext, useState } from "react";

interface IFormDisplayControlContext {
	openForm: (form: "collectPoint" | "parameter") => void;
	closeForm: () => void;
	formDisplayed: "collectPoint" | "parameter" | null;
}

interface ProviderProps {
	children: React.ReactNode;
}

export const FormDisplayControlContext = createContext(
	{} as IFormDisplayControlContext
);

export function FormDisplayControlProvider({ children }: ProviderProps) {
	const [formDisplayed, setFormDisplayed] = useState<
		"collectPoint" | "parameter" | null
	>(null);

	function openForm(form: "collectPoint" | "parameter") {
		setFormDisplayed(form);
	}

	function closeForm() {
		setFormDisplayed(null);
	}

	return (
		<FormDisplayControlContext.Provider
			value={{
				formDisplayed,
				openForm,
				closeForm,
			}}
		>
			{children}
		</FormDisplayControlContext.Provider>
	);
}
