import { useSearchParams } from "react-router-dom";
import {
	Input,
	InputGroup,
	InputGroupProps,
	InputLeftElement,
} from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import { useRef } from "react";

export function SearchBar(props: InputGroupProps) {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [search, setSearch] = useSearchParams();

	const currentSearchTerms = {} as { [x: string]: string | string[] };
	if (search.has("paramType")) {
		currentSearchTerms["paramType"] = search.getAll("paramType");
	}
	if (search.has("onlyViolated")) {
		currentSearchTerms["onlyViolated"] = search.get("onlyViolated")!;
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setSearch({
				...currentSearchTerms,
				collectionPoint: e.target.value.toLowerCase(),
			});
		}, 500);
	}

	return (
		<InputGroup {...props}>
			<InputLeftElement
				pointerEvents="none"
				color="gray.500"
				children={<BiSearchAlt />}
			/>
			<Input
				placeholder="Pesquisar ponto de coleta"
				pl={10}
				onChange={handleChange}
			/>
		</InputGroup>
	);
}
