// types export

import { Box } from './src/types/Box';
import { customConfig, config } from './src/types/config';
import { engine } from './src/types/gachi';
import { Option } from './src/types/Option';
import { pipe } from './src/types/Pipe';
import { Requestmethod, RequestOption } from './src/types/Request';
import { Response } from './src/types/Response';
// import { urls, spider } from './src/types/spider';
import { urls, spider } from './src/types/spider';

export { Box, customConfig, config, engine, Option, pipe, Requestmethod, RequestOption,Response, urls, spider as Spider };


import { BaseScheduler } from './src/spider/spider';
/** utils */
import { box } from './src/Box/box';
import { option, optionFactory, isOption } from './src/utils/Option';
import GraphQLlite from './src/utils/GraphqlLite';
import { gachi } from './src/gachi';
export {
    BaseScheduler as spider,
    box as toBox,
    option,
    optionFactory,
    isOption,
    GraphQLlite,
    gachi
}
