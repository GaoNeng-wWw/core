/* eslint-disable @typescript-eslint/no-explicit-any */
import { customConfig } from './config';
import { optionFactory } from './Option';
import { pipe } from './Pipe';
import { RequestOption } from './Request';
import { Spider } from './spider';

export type engine = {
    'requestTable': {
        'http:': (option: RequestOption) => Promise<Record<string, any>>,
        'https:': (option: RequestOption) => Promise<Record<string, any>>
    }
    'request': (
        option: optionFactory,
        cb?: (this: Spider, res: unknown, config: customConfig) => unknown,
        errorCallBack?: (this: Spider, reason: any) => void
    ) => Promise<any>;
    'pipelines': pipe[] | []
}