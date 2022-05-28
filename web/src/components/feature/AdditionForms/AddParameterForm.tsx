import {
	Button,
	FormControl,
	FormLabel,
	ModalBody,
	ModalFooter,
	ModalHeader,
	VStack,
} from "@chakra-ui/react";
import { Input } from "../../shared/Input";
import { Select } from "../../shared/Select";

export function AddParameterForm() {
	return (
		<>
			<ModalHeader>Adicionar parâmetro</ModalHeader>
			<ModalBody>
				<VStack spacing={6}>
					<FormControl id="collect-point-id" isRequired>
						<Select>
							<option value="1">Opção 1</option>
							<option value="2">Opção 2</option>
							<option value="3">Opção 3</option>
						</Select>
						<FormLabel>Ponto de coleta</FormLabel>
					</FormControl>

					<FormControl id="parameter-code" isRequired>
						<Select>
							<option value="1">Opção 1</option>
							<option value="2">Opção 2</option>
							<option value="3">Opção 3</option>
						</Select>
						<FormLabel>Nome do parâmetro</FormLabel>
					</FormControl>

					<FormControl id="value" isRequired>
						<Input placeholder=" " defaultValue={0} />
						<FormLabel>Valor</FormLabel>
					</FormControl>

					<FormControl id="collection-date" isRequired>
						<Input type="date" placeholder=" " />
						<FormLabel>Data da coleta</FormLabel>
					</FormControl>
				</VStack>
			</ModalBody>
			<ModalFooter>
				<Button>Salvar</Button>
			</ModalFooter>
		</>
	);
}
