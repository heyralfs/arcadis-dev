import { Heading, Image, Stack } from "@chakra-ui/react";
import { AdditionForms } from "./components/AdditionForms";
import { AddMenu } from "./components/AddMenu";
import Logo from "./logo.svg";

function App() {
	return (
		<Stack spacing={4} p={8} align="center">
			<Image width={300} src={Logo} alt="logo" />
			<Heading>Hello world</Heading>

			<AdditionForms />

			<AddMenu />
		</Stack>
	);
}

export default App;
