import { Input as ChakraInput, InputProps } from "@chakra-ui/react";

export function Input(props: InputProps) {
	const onFocusStyle = { borderColor: "brand.400" };

	return <ChakraInput _focus={onFocusStyle} {...props} />;
}
