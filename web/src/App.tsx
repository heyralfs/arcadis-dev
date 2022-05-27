import { Heading, Image, Stack } from "@chakra-ui/react";
import Logo from "./logo.svg";

function App() {
	return (
		<Stack spacing={4} p={8} align="center">
			<Image width={300} src={Logo} alt="logo" />
			<Heading>Hello world</Heading>
		</Stack>
	);
}

export default App;
