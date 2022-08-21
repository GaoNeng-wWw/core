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
type SelectedValue = Node | Attr | string | number | boolean;
export function extract(this: Box): string[]{
    const arr: string[] = [];
    this._selectedValue?.forEach((val)=>{
        arr.push(
            (val as Node)?.nodeValue || (val as any)?.data
        )
    });
    return arr || [];
}
export abstract class BaseParser{
    abstract transformer(data: Record<string,any>): Box | any;
}
export class Parse implements BaseParser{
    transformer(data: Record<string,any>): Box{
        return box(data['data'], data['isFail']);
    }
}