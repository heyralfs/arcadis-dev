import { Formik, Field } from "formik";
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Spinner,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { parameterConstants } from "../../../constants/parameterConstants";
import { useCollectionPointsContext } from "../../../contexts/CollectionPointsContext/useCollectionPointsContext";
import { useFormDisplayControl } from "../../../contexts/FormDisplayControlContext/useFormDisplayControl";
import { api } from "../../../services/axios";
import { Input } from "../../shared/Input";
import { Select } from "../../shared/Select";

type FormData = {
	collectPointId: number;
	code: string;
	value: number;
	collectionDate: number;
};

export function AddParameterForm() {
	const { collectionPoints, getCollectionPoints } =
		useCollectionPointsContext();
	const { closeForm } = useFormDisplayControl();
	const toast = useToast();

	const [loading, setLoading] = useState(false);

	function onSubmit(data: FormData) {
		setLoading(true);

		const collectPointId = Number(data.collectPointId);
		const collectionDate = new Date(data.collectionDate).getTime();

		api.post("parameters", { ...data, collectPointId, collectionDate })
			.then(() => {
				toast({
					description: "Parâmetro cadastrado com sucesso!",
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
			<ModalHeader>Adicionar parâmetro</ModalHeader>
			<Formik
				initialValues={{
					collectPointId: collectionPoints[0].id,
					code: parameterConstants[0].code,
					value: 0,
					collectionDate: Date.now(),
				}}
				onSubmit={onSubmit}
			>
				{({ handleSubmit, errors, touched }) => (
					<form onSubmit={handleSubmit}>
						<ModalBody>
							<VStack spacing={6}>
								<FormControl id="collect-point-id" isRequired>
									<Field
										as={Select}
										id="collectPointId"
										name="collectPointId"
									>
										{collectionPoints.map(
											(collectPoint) => (
												<option
													key={`collect-point_${collectPoint.id}`}
													value={collectPoint.id}
												>
													{collectPoint.name}
												</option>
											)
										)}
									</Field>
									<FormLabel>Ponto de coleta</FormLabel>
								</FormControl>

								<FormControl id="parameter-code" isRequired>
									<Field as={Select} id="code" name="code">
										{parameterConstants.map((param) => (
											<option
												key={param.code}
												value={param.code}
											>
												{param.name}
											</option>
										))}
									</Field>
									<FormLabel>Nome do parâmetro</FormLabel>
								</FormControl>

								<FormControl
									id="value"
									isRequired
									isInvalid={!!errors.value && touched.value}
								>
									<Field
										as={Input}
										id="value"
										name="value"
										type="number"
										placeholder=" "
										validate={(value: number) => {
											let error;
											if (value < 0) {
												error =
													"Valor deve ser não negativo.";
											}
											return error;
										}}
									/>
									<FormLabel>Valor</FormLabel>
									<FormErrorMessage>
										{errors.value}
									</FormErrorMessage>
								</FormControl>

								<FormControl id="collection-date" isRequired>
									<Field
										as={Input}
										id="collectionDate"
										name="collectionDate"
										type="date"
										placeholder=" "
									/>
									<FormLabel>Data da coleta</FormLabel>
								</FormControl>
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
