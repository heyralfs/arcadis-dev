import {
	Button,
	ButtonGroup,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	IconButton,
	Popover,
	PopoverArrow,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	Spinner,
	useDisclosure,
	useMediaQuery,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useCollectionPointsContext } from "../../../contexts/CollectionPointsContext/useCollectionPointsContext";
import { api } from "../../../services/axios";
import { ICollectionPoint } from "../../../types/CollectionPoint.interface";
import { Input } from "../../shared/Input";

interface EditPopoverProps {
	collectionPoint: ICollectionPoint;
}

export function EditPopover({ collectionPoint }: EditPopoverProps) {
	const { onOpen, onClose, isOpen } = useDisclosure();
	const [isLargerThan720] = useMediaQuery("(min-width: 720px)");

	return (
		<Popover
			isOpen={isOpen}
			onOpen={onOpen}
			onClose={onClose}
			placement={isLargerThan720 ? "right" : "auto"}
		>
			<PopoverTrigger>
				<IconButton
					variant="outline"
					color="brand.400"
					size="xs"
					aria-label="Editar ponto de coleta"
					title="Editar ponto de coleta"
					icon={<BiEdit />}
				/>
			</PopoverTrigger>

			<PopoverContent p={8} borderColor="brand.400" boxShadow="md">
				<PopoverArrow />
				<PopoverCloseButton />
				<EditForm
					collectionPoint={collectionPoint}
					closePopover={onClose}
				/>
			</PopoverContent>
		</Popover>
	);
}

interface EditFormProps {
	collectionPoint: ICollectionPoint;
	closePopover: () => void;
}

function EditForm({ collectionPoint, closePopover }: EditFormProps) {
	const { getCollectionPoints } = useCollectionPointsContext();
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	function onSubmit(
		formData: Omit<ICollectionPoint, "id" | "parameters" | "irregular">
	) {
		setLoading(true);
		api.put(`collect-points/${collectionPoint.id}`, formData)
			.then(() => {
				toast({
					description: "Ponto de coleta editado com sucesso!",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				getCollectionPoints();
				closePopover();
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
		<Formik
			initialValues={{
				name: collectionPoint.name,
				xCoord: collectionPoint.xCoord,
				yCoord: collectionPoint.yCoord,
			}}
			onSubmit={onSubmit}
		>
			{({ handleSubmit, errors, touched }) => (
				<form onSubmit={handleSubmit}>
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
							<FormErrorMessage>{errors.name}</FormErrorMessage>
						</FormControl>

						<HStack spacing={2}>
							<FormControl id="x-coord" isRequired>
								<Field
									as={Input}
									id="xCoord"
									name="xCoord"
									type="number"
									placeholder=" "
								/>
								<FormLabel htmlFor="xCoord">Coord. X</FormLabel>
							</FormControl>

							<FormControl id="y-coord" isRequired>
								<Field
									as={Input}
									id="yCoord"
									name="yCoord"
									type="number"
									placeholder=" "
								/>
								<FormLabel htmlFor="yCoord">Coord. Y</FormLabel>
							</FormControl>
						</HStack>

						<ButtonGroup w="full">
							<Button
								variant="outline"
								color="brand.400"
								w="50%"
								onClick={closePopover}
							>
								Cancelar
							</Button>
							<Button type="submit" w="50%">
								{loading ? <Spinner /> : "Salvar"}
							</Button>
						</ButtonGroup>
					</VStack>
				</form>
			)}
		</Formik>
	);
}
