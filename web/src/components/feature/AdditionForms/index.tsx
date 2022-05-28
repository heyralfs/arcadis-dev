import {
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
} from "@chakra-ui/react";
import { useFormDisplayControl } from "../../../contexts/FormDisplayControlContext/useFormDisplayControl";
import { AddCollectPointForm } from "./AddColectPointForm";
import { AddParameterForm } from "./AddParameterForm";

export function AdditionForms() {
	const { formDisplayed, closeForm } = useFormDisplayControl();

	return (
		<Modal isOpen={!!formDisplayed} onClose={closeForm}>
			<ModalOverlay />
			<ModalContent mx={2}>
				{formDisplayed === "collectPoint" && <AddCollectPointForm />}
				{formDisplayed === "parameter" && <AddParameterForm />}
				<ModalCloseButton />
			</ModalContent>
		</Modal>
	);
}
