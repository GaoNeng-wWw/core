import { RequestOption, Requestmethod, RequestOptionItem } from '../types/Request';

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
