import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { theme } from "./theme";
import { FormDisplayControlProvider } from "./contexts/FormDisplayControlContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<FormDisplayControlProvider>
				<App />
			</FormDisplayControlProvider>
		</ChakraProvider>
	</React.StrictMode>
);
