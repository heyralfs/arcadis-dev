import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { theme } from "./theme";
import { FormDisplayControlProvider } from "./contexts/FormDisplayControlContext";
import { CollectionPointsProvider } from "./contexts/CollectionPointsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<FormDisplayControlProvider>
				<CollectionPointsProvider>
					<App />
				</CollectionPointsProvider>
			</FormDisplayControlProvider>
		</ChakraProvider>
	</React.StrictMode>
);
