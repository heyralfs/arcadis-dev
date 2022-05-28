import { Button, Flex, Image, Tooltip, useDisclosure } from "@chakra-ui/react";
import { BiFilterAlt } from "react-icons/bi";
import Logo from "../../../logo.svg";
import { FilterMenu } from "../FilterMenu";

export function Header() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Flex
				as="header"
				justifyContent="space-between"
				w="100%"
				boxShadow="sm"
				p={4}
			>
				<Image src={Logo} alt="Arcadis" />

				<Tooltip label="Filtrar informações">
					<Button onClick={onOpen}>
						<BiFilterAlt />
					</Button>
				</Tooltip>
			</Flex>

			<FilterMenu isOpen={isOpen} onClose={onClose} />
		</>
	);
}
