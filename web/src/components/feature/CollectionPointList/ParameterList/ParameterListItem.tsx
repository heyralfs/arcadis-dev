import {
	Box,
	Flex,
	IconButton,
	Spinner,
	Text,
	Tooltip,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useCollectionPointsContext } from "../../../../contexts/CollectionPointsContext/useCollectionPointsContext";
import { api } from "../../../../services/axios";
import { dateFormatter } from "../../../../services/dateFormatter";
import { IParameter } from "../../../../types/CollectionPoint.interface";

interface ParameterListItemProps {
	parameter: IParameter;
}

export function ParameterListItem({ parameter }: ParameterListItemProps) {
	const { id, name, collectionDate, value, unit, overLimit } = parameter;
	const { getCollectionPoints } = useCollectionPointsContext();
	const toast = useToast();

	const [loading, setLoading] = useState(false);

	function handleDelete() {
		setLoading(true);
		api.delete(`parameters/${id}`)
			.then(() => {
				toast({
					description: "Parâmetro excluído com sucesso!",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				getCollectionPoints();
			})
			.catch((err) => {
				toast({
					description: err.response.data.message[0],
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<Tooltip label={overLimit ? "Parâmetro acima do limite permitido" : ""}>
			<Flex
				w="100%"
				justifyContent="space-between"
				color={overLimit ? "red.400" : "gray"}
				fontSize="sm"
			>
				<Box>
					<Text display="inline">{name}</Text>
					<Tooltip label="Data da coleta">
						<Text display="inline" ml={1}>
							({dateFormatter(collectionDate)})
						</Text>
					</Tooltip>
				</Box>
				<Box flex="1" borderBottom="1px dotted" />
				<Text>{`${value} ${unit}`}</Text>
				<Tooltip label="Excluir">
					<IconButton
						variant="outline"
						size="xs"
						ml={2}
						color="brand.400"
						aria-label="Excluir"
						icon={loading ? <Spinner size="xs" /> : <BiTrash />}
						onClick={handleDelete}
					/>
				</Tooltip>
			</Flex>
		</Tooltip>
	);
}
