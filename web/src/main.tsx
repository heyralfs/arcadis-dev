import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { theme } from "./theme";
import { FormDisplayControlProvider } from "./contexts/FormDisplayControlContext";
import { CollectionPointsProvider } from "./contexts/CollectionPointsContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<FormDisplayControlProvider>
				<CollectionPointsProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</CollectionPointsProvider>
			</FormDisplayControlProvider>
		</ChakraProvider>
	</React.StrictMode>
);
