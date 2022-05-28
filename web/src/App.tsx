import { Stack } from "@chakra-ui/react";
import { AdditionForms } from "./components/feature/AdditionForms";
import { FormsMenu } from "./components/feature/FormsMenu";
import { Header } from "./components/feature/Header";

function App() {
	return (
		<>
			<Header />

			<AdditionForms />
			<FormsMenu />
		</>
	);
}

export default App;
