import { ClientRequest, ClientRequestArgs } from 'http';

export type Requestmethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';

export interface RequestOption{
	isOption?: boolean;
	value: RequestOptionItem,
}

export interface RequestOptionItem extends ClientRequestArgs {
	param?: Record<string,unknown>;
	method?: Requestmethod,
	[x:string]: any
}

export interface requestMiddleware{
	https?: ((req:ClientRequest) => void)[],
	http?: ((req: ClientRequest) => void)[],
}

