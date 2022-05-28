import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
} from "@chakra-ui/react";
import { Input } from "../../shared/Input";

interface FilterMenuProps {
	isOpen: boolean;
	onClose: () => void;
}

export function FilterMenu({ isOpen, onClose }: FilterMenuProps) {
	return (
		<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Filtrar informações</DrawerHeader>

				<DrawerBody>
					<Input placeholder="Type here..." />
				</DrawerBody>

				<DrawerFooter>
					<Button variant="outline" mr={3} onClick={onClose}>
						Cancelar
					</Button>
					<Button>Aplicar</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
