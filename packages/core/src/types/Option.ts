import { RequestOptionItem } from "./Request";

export declare class optionFactory {
	public isOption: boolean;
	public value: RequestOptionItem & URL;
}
export declare type Option = typeof optionFactory;
