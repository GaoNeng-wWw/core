import { SelectedValue } from 'xpath';
import { Box } from './Box';

export declare function extract(this: Box): SelectedValue[];

export declare class BaseParser{
	transformer(data: Record<string,unknown>): Box;
}