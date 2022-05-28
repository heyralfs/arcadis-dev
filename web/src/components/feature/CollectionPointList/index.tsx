import { Flex, Text } from "@chakra-ui/react";
import { ICollectionPoint } from "../../../types/CollectionPoint.interface";
import { CollectionPointListItem } from "./CollectionPointListItem";

interface CollectionPointListProps {
	collectionPoints: ICollectionPoint[];
}

export function CollectionPointList({
	collectionPoints,
}: CollectionPointListProps) {
	return (
		<Flex mx="auto" maxW="720px" flexDir="column" gap={4} p={8}>
			{!collectionPoints.length ? (
				<Text>Nenhum ponto de coleta encontrado.</Text>
			) : (
				<>
					{collectionPoints.map((collectionPoint) => (
						<CollectionPointListItem
							key={collectionPoint.id}
							collectionPoint={collectionPoint}
						/>
					))}
				</>
			)}
		</Flex>
	);
}
