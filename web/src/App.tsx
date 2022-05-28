import { useEffect } from "react";
import { AdditionForms } from "./components/feature/AdditionForms";
import { CollectionPointList } from "./components/feature/CollectionPointList";
import { FormsMenu } from "./components/feature/FormsMenu";
import { Header } from "./components/feature/Header";
import { useCollectionPointsContext } from "./contexts/CollectionPointsContext/useCollectionPointsContext";

function App() {
	const { getCollectionPoints } = useCollectionPointsContext();

	useEffect(() => {
		getCollectionPoints();
	}, []);

	return (
		<>
			<Header />
			<CollectionPointList />

			<AdditionForms />
			<FormsMenu />
		</>
	);
}

export default App;
