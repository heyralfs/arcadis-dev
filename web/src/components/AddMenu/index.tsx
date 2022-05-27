import { AddIcon } from "@chakra-ui/icons";
import {
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Tooltip,
} from "@chakra-ui/react";
import { useFormDisplayControl } from "../../contexts/FormDisplayControlContext/useFormDisplayControl";

export function AddMenu() {
	const { openForm } = useFormDisplayControl();

	return (
		<Menu closeOnSelect>
			<Tooltip label="Adicionar">
				<MenuButton
					as={Button}
					height={12}
					width={12}
					rounded="full"
					colorScheme={"orange"}
					bgColor="brand.400"
					position="fixed"
					bottom={8}
					right={8}
				>
					<AddIcon />
				</MenuButton>
			</Tooltip>

			<MenuList color="brand.400">
				<MenuItem onClick={() => openForm("collectPoint")}>
					Ponto de coleta
				</MenuItem>
				<MenuItem onClick={() => openForm("parameter")}>
					Parâmetro
				</MenuItem>
			</MenuList>
		</Menu>
	);
}
