import {
	Button,
	FormControl,
	FormLabel,
	HStack,
	ModalBody,
	ModalFooter,
	ModalHeader,
	VStack,
} from "@chakra-ui/react";
import { Input } from "../@shared/Input";

export function AddCollectPointForm() {
	return (
		<>
			<ModalHeader>Adicionar ponto de coleta</ModalHeader>
			<ModalBody>
				<VStack spacing={6}>
					<FormControl id="collect-point-name" isRequired>
						<Input placeholder=" " />
						<FormLabel>Nome</FormLabel>
					</FormControl>

					<HStack spacing={6}>
						<FormControl id="x-coord" isRequired>
							<Input placeholder=" " />
							<FormLabel>Coordenada X</FormLabel>
						</FormControl>

						<FormControl id="y-coord" isRequired>
							<Input placeholder=" " />
							<FormLabel>Coordenada Y</FormLabel>
						</FormControl>
					</HStack>
				</VStack>
			</ModalBody>
			<ModalFooter>
				<Button>Salvar</Button>
			</ModalFooter>
		</>
	);
}
