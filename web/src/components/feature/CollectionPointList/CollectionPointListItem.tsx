import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Badge,
	Box,
	Flex,
	Text,
} from "@chakra-ui/react";
import { ICollectionPoint } from "../../../types/CollectionPoint.interface";
import { ParameterList } from "./ParameterList";

interface CollectionPointListItemProps {
	collectionPoint: ICollectionPoint;
}

export function CollectionPointListItem({
	collectionPoint,
}: CollectionPointListItemProps) {
	const hasViolation = !!collectionPoint.parameters.filter(
		(param) => param.overLimit
	).length;

	return (
		<Accordion allowMultiple>
			<AccordionItem
				borderWidth="1px"
				borderColor={hasViolation ? "red.100" : "gray.200"}
				borderRadius={4}
				boxShadow="sm"
			>
				<AccordionButton as="header" cursor="pointer">
					<Flex w="100%" justifyContent="space-between">
						<Box>
							<Text
								display="inline-block"
								fontSize="sm"
								fontWeight="bold"
								textTransform="uppercase"
							>
								{collectionPoint.name}
							</Text>
							{hasViolation && (
								<Badge ml={2} colorScheme="red">
									Irregular
								</Badge>
							)}
						</Box>
						<AccordionIcon />
					</Flex>
				</AccordionButton>

				<AccordionPanel>
					<Text fontSize="sm" color="gray.400" mb={2}>
						Coordenadas: {collectionPoint.xCoord},{" "}
						{collectionPoint.yCoord}
					</Text>

					<Text
						fontSize="sm"
						color="brand.400"
						fontWeight="bold"
						mb={2}
					>
						Parâmetros coletados:
					</Text>
					{collectionPoint.parameters.length ? (
						<ParameterList
							parameters={collectionPoint.parameters}
						/>
					) : (
						<Text>Nenhum parâmetro cadastrado.</Text>
					)}
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
}
