import { Formik, Field } from "formik";
import {
	Button,
	Checkbox,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	FormControl,
	FormLabel,
	Stack,
	Switch,
	Text,
	VStack,
} from "@chakra-ui/react";
import {
	parameterConstants,
	parameterCodes,
} from "../../../constants/parameterConstants";
import { useSearchParams } from "react-router-dom";

interface FilterMenuProps {
	isOpen: boolean;
	onClose: () => void;
}

type ParamCodes = typeof parameterCodes[number];
type Filter = {
	[x in ParamCodes]: boolean;
} & {
	onlyViolated: boolean;
};

export function FilterMenu({ isOpen, onClose }: FilterMenuProps) {
	const [search, setSearch] = useSearchParams();

	// Calculate initial values
	const selectedParamTypes = search.getAll("paramType");
	const initialValues = parameterCodes.reduce(
		(result, code) => {
			result[code] = selectedParamTypes.includes(code);
			return result;
		},
		{ onlyViolated: !!search.get("onlyViolated") } as Filter
	);

	// Apply filters handler
	function applyFilters(filters: Filter) {
		let filtersToApply: string[] = [];
		Object.entries(filters).forEach((item) => {
			if (item[1] && item[0] !== "onlyViolated")
				filtersToApply.push(item[0]);
		});
		let searchTerms = {} as { [x: string]: string | string[] };
		searchTerms["paramType"] = filtersToApply;
		const collectPointSearchTerm = search.get("collectionPoint");
		if (collectPointSearchTerm) {
			searchTerms["collectionPoint"] = collectPointSearchTerm;
		}
		if (filters.onlyViolated) {
			searchTerms["onlyViolated"] = "true";
		}
		setSearch(searchTerms);
		onClose();
	}

	// Clear filters handler
	function clearFilters() {
		const collectPointSearchTerm = search.get("collectionPoint");
		if (collectPointSearchTerm) {
			setSearch({ collectionPoint: collectPointSearchTerm });
		} else {
			setSearch({});
		}
		onClose();
	}

	return (
		<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Filtrar informações</DrawerHeader>
				<Formik initialValues={initialValues} onSubmit={applyFilters}>
					{({ handleSubmit }) => (
						<form
							onSubmit={handleSubmit}
							style={{
								display: "flex",
								flexDirection: "column",
								flex: "1",
								alignItems: "space-between",
							}}
						>
							<DrawerBody>
								<VStack spacing={4}>
									<FormControl
										display="flex"
										alignItems="center"
										variant="solid"
									>
										<Field
											as={Switch}
											id="onlyViolated"
											name="onlyViolated"
											defaultChecked={
												initialValues.onlyViolated
											}
										/>
										<FormLabel
											htmlFor="onlyViolated"
											mb={0}
											ml={2}
											fontSize="sm"
										>
											Mostrar apenas irregulares
										</FormLabel>
									</FormControl>

									<FormControl variant="solid">
										<Text
											fontSize="sm"
											mb={2}
											fontWeight="bold"
											color="gray.700"
										>
											Filtrar por parâmetro
										</Text>
										<Stack spacing={2}>
											{parameterConstants.map((param) => (
												<Field
													as={Checkbox}
													key={param.code}
													id={param.code}
													name={param.code}
													value={param.code}
													defaultChecked={
														initialValues[
															param.code
														]
													}
												>
													<Text fontSize="sm">
														{param.name}
													</Text>
												</Field>
											))}
										</Stack>
									</FormControl>
								</VStack>
							</DrawerBody>

							<DrawerFooter>
								<Button
									variant="outline"
									mr={3}
									onClick={clearFilters}
								>
									Limpar
								</Button>
								<Button type="submit">Aplicar</Button>
							</DrawerFooter>
						</form>
					)}
				</Formik>
			</DrawerContent>
		</Drawer>
	);
}
