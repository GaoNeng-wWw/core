export declare type Box = {
    readyToReply?: boolean;
    isFail: boolean;
    _raw: any;
    _doc: Document | null;
    _hasDoc: boolean;
    _selectedValue?: Array<Node | Attr | string | number | boolean>;
    xpath?: (this: Box, selector: string) => Box;
    extract?: extract
}