import { Select as ChakraSelect, SelectProps } from "@chakra-ui/react";

export function Select(props: SelectProps) {
	const onFocusStyle = { borderColor: "brand.400" };

	return (
		<ChakraSelect _focus={onFocusStyle} {...props}>
			{props.children}
		</ChakraSelect>
	);
}
