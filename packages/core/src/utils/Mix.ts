type constructor<T = Record<string, any>> = new (...args: any[]) => T;
export function mix<T extends constructor<[]>>(...mixins: T[]): any{
	class base{}
	function copyPrototype(target: base, source: T){
		for (const k of Reflect.ownKeys(target)){
			if (!['constructor','name','prototype'].includes(k as string)){				
				const desc = Object.getOwnPropertyDescriptor(source,k);
				Object.defineProperty(target,k,desc as PropertyDecorator);
			}
		}
	}

	for (const m of mixins){
		copyPrototype(base, m);
		copyPrototype(base.prototype, m.prototype);
		copyPrototype(base.prototype, m.prototype.__proto__);
	}
	return base;
}