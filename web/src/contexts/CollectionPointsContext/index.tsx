import { createContext, useState } from "react";
import { api } from "../../services/axios";
import { ICollectionPoint } from "../../types/CollectionPoint.interface";

interface ICollectionPointsContext {
	collectionPoints: ICollectionPoint[];
	getCollectionPoints: () => void;
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

	function hasViolation(collectionPoint: ICollectionPoint): boolean {
		return !!collectionPoint.parameters.filter((param) => param.overLimit)
			.length;
	}

	function getCollectionPoints() {
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
			.catch((err) => console.log(err));
	}

	return (
		<CollectionPointsContext.Provider
			value={{ collectionPoints, getCollectionPoints }}
		>
			{children}
		</CollectionPointsContext.Provider>
	);
}
