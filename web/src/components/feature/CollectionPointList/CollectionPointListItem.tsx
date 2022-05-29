import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Badge,
	Box,
	Flex,
	HStack,
	Text,
} from "@chakra-ui/react";
import { ICollectionPoint } from "../../../types/CollectionPoint.interface";
import { EditPopover } from "./EditPopover";
import { ParameterList } from "./ParameterList";

interface CollectionPointListItemProps {
	collectionPoint: ICollectionPoint;
}

export function CollectionPointListItem({
	collectionPoint,
}: CollectionPointListItemProps) {
	return (
		<Accordion allowMultiple>
			<AccordionItem
				borderWidth="1px"
				borderColor={collectionPoint.irregular ? "red.100" : "gray.200"}
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
							{collectionPoint.irregular && (
								<Badge ml={2} colorScheme="red">
									Irregular
								</Badge>
							)}
						</Box>
						<AccordionIcon />
					</Flex>
				</AccordionButton>

				<AccordionPanel>
					<HStack
						justifyContent="space-between"
						alignItems="center"
						mb={2}
					>
						<Text fontSize="sm" color="gray.400">
							Coordenadas: {collectionPoint.xCoord},{" "}
							{collectionPoint.yCoord}
						</Text>

						<EditPopover collectionPoint={collectionPoint} />
					</HStack>

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
