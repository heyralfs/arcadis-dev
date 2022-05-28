import { Formik, Field } from "formik";
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	ModalBody,
	ModalFooter,
	ModalHeader,
	VStack,
	useToast,
	Spinner,
} from "@chakra-ui/react";
import { Input } from "../../shared/Input";
import { api } from "../../../services/axios";
import { useFormDisplayControl } from "../../../contexts/FormDisplayControlContext/useFormDisplayControl";
import { useState } from "react";
import { useCollectionPointsContext } from "../../../contexts/CollectionPointsContext/useCollectionPointsContext";

type FormData = {
	name: string;
	xCoord: number;
	yCoord: number;
};

export function AddCollectPointForm() {
	const { getCollectionPoints } = useCollectionPointsContext();
	const { closeForm } = useFormDisplayControl();
	const toast = useToast();

	const [loading, setLoading] = useState(false);

	function onSubmit(data: FormData) {
		setLoading(true);
		api.post("collect-points", data)
			.then(() => {
				toast({
					description: "Ponto de coleta cadastrado com sucesso!",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				getCollectionPoints();
				closeForm();
			})
			.catch((err) => {
				console.error(err);
				toast({
					description: err.response.data.message[0],
					status: "error",
					duration: 5000,
					isClosable: true,
				});
				setLoading(false);
			});
	}

	return (
		<>
			<ModalHeader>Adicionar ponto de coleta</ModalHeader>
			<Formik
				initialValues={{
					name: "",
					xCoord: 0,
					yCoord: 0,
				}}
				onSubmit={onSubmit}
			>
				{({ handleSubmit, errors, touched }) => (
					<form onSubmit={handleSubmit}>
						<ModalBody>
							<VStack spacing={6}>
								<FormControl
									id="collect-point-name"
									isInvalid={!!errors.name && touched.name}
									isRequired
								>
									<Field
										as={Input}
										id="name"
										name="name"
										type="text"
										placeholder=" "
										validate={(value: string) => {
											let error;
											if (value.length > 120) {
												error =
													"Nome deve ter no máximo 120 caracteres.";
											}
											return error;
										}}
									/>
									<FormLabel htmlFor="name">Nome</FormLabel>
									<FormErrorMessage>
										{errors.name}
									</FormErrorMessage>
								</FormControl>

								<HStack spacing={6}>
									<FormControl id="x-coord" isRequired>
										<Field
											as={Input}
											id="xCoord"
											name="xCoord"
											type="number"
											placeholder=" "
										/>
										<FormLabel htmlFor="xCoord">
											Coordenada X
										</FormLabel>
									</FormControl>

									<FormControl id="y-coord" isRequired>
										<Field
											as={Input}
											id="yCoord"
											name="yCoord"
											type="number"
											placeholder=" "
										/>
										<FormLabel htmlFor="yCoord">
											Coordenada Y
										</FormLabel>
									</FormControl>
								</HStack>
							</VStack>
						</ModalBody>
						<ModalFooter>
							<Button type="submit">
								{loading ? <Spinner /> : "Salvar"}
							</Button>
						</ModalFooter>
					</form>
				)}
			</Formik>
		</>
	);
}
