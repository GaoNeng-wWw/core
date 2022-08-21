// types export

import { Box } from './src/types/Box';
import { customConfig, config } from './src/types/config';
import { engine } from './src/types/gachi';
import { Option } from './src/types/Option';
import { pipe } from './src/types/Pipe';
import { Requestmethod, RequestOption } from './src/types/Request';
import { Response } from './src/types/Response';
import { Spider } from './src/spider/spider';
import { urls, spiderRunParam } from './src/types/spider';
import { Parse, BaseParser } from './src/parser/parser';

export {
	Parse,
	BaseParser,
	Box,
	customConfig,
	config,
	engine,
	Option,
	pipe,
	Requestmethod,
	RequestOption,
	Response,
	urls,
	spiderRunParam
};

/** utils */
import { box } from './src/Box/box';
import { option, optionFactory, isOption } from './src/utils/Option';
import GraphQLlite from './src/utils/GraphqlLite';
import { gachi } from './src/gachi';
export {
	Spider as spider,
	box as toBox,
	option,
	optionFactory,
	isOption,
	GraphQLlite,
	gachi,
};
