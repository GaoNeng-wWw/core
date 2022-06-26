import { exit } from 'process';
import { DOMParser } from 'xmldom';
import { extract, xpath } from '../parser/parser';
import { Box } from '../types/Box';

export function box(data: any, isFail: boolean): Box{
    let hasDoc = false;
    let doc;
    try{ 
        const html = data.toString().replace(/&/gim,'&amp;');
        doc = new DOMParser().parseFromString(html);
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
    }
}
