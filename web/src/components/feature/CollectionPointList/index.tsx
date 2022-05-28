import { Flex, Text } from "@chakra-ui/react";
import { useCollectionPointsContext } from "../../../contexts/CollectionPointsContext/useCollectionPointsContext";
import { CollectionPointListItem } from "./CollectionPointListItem";

export function CollectionPointList() {
	const { collectionPoints } = useCollectionPointsContext();

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
