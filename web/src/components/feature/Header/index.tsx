import {
	Box,
	Button,
	Grid,
	Image,
	Tooltip,
	useDisclosure,
} from "@chakra-ui/react";
import { BiFilterAlt } from "react-icons/bi";
import Logo from "../../../logo.svg";
import { FilterMenu } from "../FilterMenu";
import { SearchBar } from "./SearchBar";

export function Header() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Grid
				as="header"
				w="100%"
				boxShadow="sm"
				templateColumns={[
					"repeat(2,1fr)",
					"repeat(2,1fr)",
					"1fr 2fr 1fr",
				]}
				alignItems="center"
				gap={4}
				p={4}
			>
				<Image src={Logo} alt="Arcadis" />

				<SearchBar
					maxW="700px"
					m="auto"
					display={["none", "none", "block"]}
				/>

				<Box w="100%" display="flex" justifyContent="flex-end">
					<Tooltip label="Filtrar informações">
						<Button onClick={onOpen} w={12}>
							<BiFilterAlt />
						</Button>
					</Tooltip>
				</Box>
			</Grid>

			<FilterMenu isOpen={isOpen} onClose={onClose} />
		</>
	);
}
