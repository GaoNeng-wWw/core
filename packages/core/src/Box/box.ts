import { DOMParser } from 'xmldom';
import { extract, xpath } from '../parser/parser';
import { Box } from '../types/Box';
const errorHandle = (level: string, msg: string)=>{
	if (level !== 'warning'){
		console.log(msg);
	}
};
export function box(data: string, isFail: boolean): Box{
	let hasDoc = false;
	let doc;
	try{ 
		const html = data.toString().replace(/&/gim,'&amp;');
		doc = new DOMParser({
			errorHandler: errorHandle
		}).parseFromString(html);
		hasDoc = true;
	} catch (e) {
		doc = null;
	}
	return {
		readyToReply: false,
		isFail: isFail,
		_raw: data,
		_hasDoc: hasDoc,
		_doc: doc,
		xpath,
		extract
	};
}
