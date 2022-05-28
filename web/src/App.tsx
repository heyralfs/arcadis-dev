import { Heading, Image, Stack } from "@chakra-ui/react";
import { AdditionForms } from "./components/feature/AdditionForms";
import { FormsMenu } from "./components/feature/FormsMenu";
import Logo from "./logo.svg";

function App() {
	return (
		<Stack spacing={4} p={8} align="center">
			<Image width={300} src={Logo} alt="logo" />
			<Heading>Hello world</Heading>

			<AdditionForms />

			<FormsMenu />
		</Stack>
	);
}

export default App;
