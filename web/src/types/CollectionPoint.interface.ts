export interface IParameter {
	id: number;
	code: string;
	name: string;
	value: number;
	unit: string;
	collectionDate: number;
	overLimit: boolean;
}

export interface ICollectionPoint {
	id: number;
	name: string;
	xCoord: number;
	yCoord: number;
	irregular: boolean;
	parameters: IParameter[];
}
