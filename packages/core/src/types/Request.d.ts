import { ClientRequest, ClientRequestArgs } from 'http';

export declare type Requestmethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';

export declare interface RequestOption{
	isOption?: boolean;
	value: RequestOptionItem,
}

export declare interface RequestOptionItem extends ClientRequestArgs {
	param?: Record<string,unknown>;
	method?: Requestmethod
}

export declare interface requestMiddleware{
	https?: ((req:ClientRequest) => void)[],
	http?: ((req: ClientRequest) => void)[],
}

