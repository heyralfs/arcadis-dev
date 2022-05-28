import { useContext } from "react";
import { CollectionPointsContext } from "./";

export function useCollectionPointsContext() {
	return useContext(CollectionPointsContext);
}
