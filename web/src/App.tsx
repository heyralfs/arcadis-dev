import { useEffect, useState } from "react";
import { AdditionForms } from "./components/feature/AdditionForms";
import { CollectionPointList } from "./components/feature/CollectionPointList";
import { FormsMenu } from "./components/feature/FormsMenu";
import { Header } from "./components/feature/Header";
import { api } from "./services/axios";
import { ICollectionPoint } from "./types/CollectionPoint.interface";

function App() {
	const [collectionPoints, setCollectionPoints] = useState<
		ICollectionPoint[]
	>([]);

	useEffect(() => {
		api.get("collect-points")
			.then((resp) => setCollectionPoints(resp.data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<Header />
			<CollectionPointList collectionPoints={collectionPoints} />

			<AdditionForms />
			<FormsMenu />
		</>
	);
}

export default App;
