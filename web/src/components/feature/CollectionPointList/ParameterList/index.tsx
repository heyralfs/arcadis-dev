import { VStack } from "@chakra-ui/react";
import { IParameter } from "../../../../types/CollectionPoint.interface";
import { ParameterListItem } from "./ParameterListItem";

interface ParameterListProps {
	parameters: IParameter[];
}

export function ParameterList({ parameters }: ParameterListProps) {
	return (
		<VStack spacing={2}>
			{parameters.map((param) => (
				<ParameterListItem key={param.id} parameter={param} />
			))}
		</VStack>
	);
}
