import { select } from 'xpath';
import { Box } from '../types/Box';
import { box } from '../Box/box';

export function xpath(this: Box, selector: string): Box{
	if (!this._hasDoc){
		throw new Error('Not has doc');
	}
	if (this._doc){
		this._selectedValue = select(selector, this._doc);
	}
	return this;
}
export function extract(this: Box): string[]{
	const arr: string[] = [];
	this._selectedValue?.forEach((val)=>{
		arr.push(
			(val as Node)?.nodeValue || ''
		);
	});
	return arr || [];
}
export abstract class BaseParser{
    abstract transformer(data: Record<string,unknown>): Box;
}
export class Parse implements BaseParser{
	transformer(data: Record<string,unknown>): Box{
		return box(data['data'] as string, data['isFail'] as boolean);
	}
}