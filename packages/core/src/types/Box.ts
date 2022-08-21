export type Box = {
    readyToReply?: boolean;
    isFail: boolean;
    _raw: string;
    _doc: Document | null;
    _hasDoc: boolean;
    _selectedValue?: Array<Node | Attr | string | number | boolean>;
    xpath?: (this: Box, selector: string) => Box;
    extract: (this: Box) => string[];
    [x:string]: unknown
}