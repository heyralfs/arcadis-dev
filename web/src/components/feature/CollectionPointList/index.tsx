import { Flex, Skeleton, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useCollectionPointsContext } from "../../../contexts/CollectionPointsContext/useCollectionPointsContext";
import { ICollectionPoint } from "../../../types/CollectionPoint.interface";
import { CollectionPointListItem } from "./CollectionPointListItem";

export function CollectionPointList() {
	const [search] = useSearchParams();
	const { collectionPoints, isFetching } = useCollectionPointsContext();

	const searchPramTypes = search.getAll("paramType");
	const showOnlyViolated = !!search.get("onlyViolated");
	const searchCollectPointTerm = search.get("collectionPoint") || "";

	function handleSearchParams(collectPointsArr: ICollectionPoint[]) {
		let filteredArr = collectPointsArr.filter((item) =>
			item.name.toLowerCase().includes(searchCollectPointTerm)
		);
		if (showOnlyViolated) {
			filteredArr = filteredArr.filter((item) => item.irregular);
		}
		searchPramTypes.forEach((paramType) => {
			filteredArr = filteredArr.filter((item) => {
				const filteredParams = item.parameters.filter(
					(param) => param.code === paramType
				);
				return !!filteredParams.length;
			});
		});
		return filteredArr;
	}

	const filteredCollectionPoints = handleSearchParams(collectionPoints);

	if (isFetching) {
		return (
			<Flex mx="auto" maxW="720px" flexDir="column" gap={4} p={8}>
				<Skeleton w="100%" h="40px" />
			</Flex>
		);
	}

	return (
		<Flex mx="auto" maxW="720px" flexDir="column" gap={4} p={8}>
			{!filteredCollectionPoints.length ? (
				<Text>Nenhum ponto de coleta encontrado.</Text>
			) : (
				<>
					{filteredCollectionPoints.map((collectionPoint) => (
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
