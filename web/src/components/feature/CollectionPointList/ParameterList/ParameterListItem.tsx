import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import { dateFormatter } from "../../../../services/dateFormatter";
import { IParameter } from "../../../../types/CollectionPoint.interface";

interface ParameterListItemProps {
	parameter: IParameter;
}

export function ParameterListItem({ parameter }: ParameterListItemProps) {
	const { name, collectionDate, value, unit, overLimit } = parameter;

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
			</Flex>
		</Tooltip>
	);
}
