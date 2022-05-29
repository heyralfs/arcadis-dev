import { createContext, useState } from "react";
import { api } from "../../services/axios";
import { ICollectionPoint } from "../../types/CollectionPoint.interface";

interface ICollectionPointsContext {
	collectionPoints: ICollectionPoint[];
	getCollectionPoints: () => void;
	isFetching: boolean;
}

interface ProviderProps {
	children: React.ReactNode;
}

export const CollectionPointsContext = createContext(
	{} as ICollectionPointsContext
);

export function CollectionPointsProvider({ children }: ProviderProps) {
	const [collectionPoints, setCollectionPoints] = useState<
		ICollectionPoint[]
	>([]);
	const [isFetching, setIsFetching] = useState(true);

	function hasViolation(collectionPoint: ICollectionPoint): boolean {
		return !!collectionPoint.parameters.filter((param) => param.overLimit)
			.length;
	}

	function getCollectionPoints() {
		setIsFetching(true);
		api.get("collect-points")
			.then(({ data }) => {
				const formattedData = data.map(
					(collectionPoint: ICollectionPoint) => ({
						...collectionPoint,
						irregular: hasViolation(collectionPoint),
					})
				);
				setCollectionPoints(formattedData);
			})
			.catch((err) => console.log(err))
			.finally(() => setIsFetching(false));
	}

	return (
		<CollectionPointsContext.Provider
			value={{ collectionPoints, getCollectionPoints, isFetching }}
		>
			{children}
		</CollectionPointsContext.Provider>
	);
}
