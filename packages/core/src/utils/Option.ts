import { RequestOption, Requestmethod, RequestOptionItem } from '../types/Request';
import { urls } from '../types/spider';

function prcessParam(val: RequestOptionItem & URL,param: Record<string, unknown>){
	if (val.method === 'GET'){
		Object.entries(param).forEach((v,i)=>{
			val.searchParams.set(v[0],String(v[1]));
		})
	}
	return val;
}

export function isOption(likeOption: unknown): boolean{
	if (likeOption instanceof Object){
		return (likeOption as Record<string,unknown>).isOption ? true : false;
	}
	return false;
}

export function option(url: string, method: Requestmethod, param: Record<string,unknown>, args?:Record<string,unknown>): optionFactory{
	return new optionFactory(url, method, param, args);
}
export function url2Option(url: urls){
	let requestOption: optionFactory;
    let [Request_url,Request_method,Request_param] = ['', 'GET' as Requestmethod, {}];
    if (url instanceof Array){
        Request_url = (url as string[])?.[0];
        Request_method = (url as string[])?.[1] as Requestmethod;
        Request_param = (url as string[])?.[2];
        requestOption = new optionFactory(Request_url,Request_method,Request_param);
    } else if (typeof url === 'string'){
        requestOption = new optionFactory(url, 'GET', {});
    } else {
        requestOption = url;
    }
    return requestOption;
}
export class optionFactory{
	public isOption = true;
	public value: RequestOptionItem & URL;
	constructor(url: string, method: Requestmethod, param: Record<string,unknown>, args?:Record<string,unknown>){
		this.value = new URL(url);
		Object.defineProperty(this.value, 'method', {
			value: method,
			configurable: true,
			writable: true,
			enumerable: true,
		});
		Object.defineProperty(this.value, 'param', {
			value: param,
			configurable: true,
			writable: true,
			enumerable: true,
		});
		this.value = prcessParam(this.value, param);
		if (args){
			const [key,value] = [Object.keys(args), Object.values(args)];
			key.forEach((k,i)=>{
				Object.defineProperty(this.value, k, {
					value: value[i],
					configurable: true,
					writable: true,
					enumerable: true,
				});
			});
		}
	}
}
