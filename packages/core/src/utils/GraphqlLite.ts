import tree from './Tree';
import {Node_} from './Tree';
import {extend} from 'lodash';

export default class GraphQLlite{
	private static ast(queryString: string){
		const tmpParent = [''];
		let query = '';
		try {
			query = queryString.replace(/\n/gim, '').replace(/ /gim,'');
		} catch (e) {
			query = queryString;
		}
		let word = '';
		let parent = '';
		for (let i=0;i<query.length;i++){
			if (query[i] === '}'){
				parent = tmpParent.pop() as string;
				continue;
			}
			if (query[i] !== '{' && query[i] !== ';'){
				word += query[i];
			}
			if (query[i] === '{'){
				if (!parent){
					tree.append(undefined, {data: word,type: 'parent'});
				} else {
					tree.append({data: parent, type: 'parent'}, {data: word, type: 'parent'});
				}
				tmpParent.push(parent);
				parent = word;
				word = '';
			}
			if (query[i] === ';'){
				if (!parent){
					tree.append(undefined,{data: word, type: 'item'});
				} else {
					tree.append({data: parent, type: 'parent'}, {data: word, type: 'item'});
				}
				word = '';
			}
		}
		return tree.head;
	}
	public static query(queryString: string,dataSource:any): Record<string,unknown>{
		queryString = queryString.replace(/\n|\t| /gim, '');
		this.ast(queryString);
		const queryTree = {};
		const astTree = tree.getTree();
		const stack = [...astTree.children];
		let data = dataSource;
		const objArray = [];
		const mergeData = (obj:Record<string,unknown>, parent:string | null | undefined | Node_, dataSource: any | undefined) => {
			if (!parent){
				const source = JSON.parse(JSON.stringify(obj));
				
				// queryTree
				extend(
					queryTree,
					source
				);
				return ;
			} else {
				let data = queryTree;
				const stack = [...Object.keys(data)];
				while (stack.length){
					const key = stack.pop();
					if (key === (parent as Node_).data.data){
						extend((data as any)[key as string],obj);						
						break;
					} else {
						const paths = this.findParentPath(dataSource, parent as Node_);
						paths.forEach((path:string)=>{
							if ((data as any)[path as string] === (parent as Node_).data.data){
								extend((data as any)[key as string], obj);
							} else {
								data = (data as any)[path];
							}
						});
						stack.push(...Object.keys(data));
					}
				}
			}
		};
		if (!(dataSource instanceof Object)){
			dataSource = JSON.parse(dataSource);
		}
		while (stack.length){
			const shiftItem = stack.shift();
			if (shiftItem?.data.type === 'item'){
				if (shiftItem.data.data === '*;'){/** */}
				data = this.findItem(dataSource, shiftItem);
				if (data instanceof Node_){
					data = dataSource[data.data.data];
				}
				const obj = Object.defineProperty({}, shiftItem.data.data ,{
					value: data,
					enumerable: true,
					configurable: true,
					writable: true,
				});
				objArray.push(obj);
				mergeData(obj, shiftItem?.parent as unknown as string | null, dataSource);
				continue;
			} else {
				const children = shiftItem?.children as Node_[];
				for (let i=children.length-1; i >= 0;i--){
					stack.unshift(children[i]);
				}
				data = this.findNode(dataSource, shiftItem as Node_);
				const obj =Object.defineProperty({},shiftItem?.data.data, {
					value: {},
					writable: true,
					enumerable: true,
					configurable: true
				});
				objArray.push(obj);
				mergeData(obj, shiftItem?.parent as unknown as string | null, dataSource);
			}
		}
		return queryTree;
	}
	private static findItem(dataSource:any ,node:Node_){
		if (!node.parent){
			return node;
		}
		let tmpNode = node;
		let data = dataSource;
		const paths:Node_[] = [tmpNode];
		while (tmpNode.parent){
			paths.push(tmpNode.parent);
			tmpNode = tmpNode.parent;
		}
		paths.reverse();
		for (const path of paths){
			if ((path as unknown as Node_).data.data === '*'){
				break;
			}
			data = data[(path as unknown as Node_).data.data];
		}
		return data;
	}
	private static findNode(dataSource: any, node:Node_){
		if (!node){
			return;
		}
		let data = dataSource;
		const paths:string[] = [node.data.data];
		let tmpNode:Node_ | null = node;
		while (tmpNode?.parent){
			paths.unshift(tmpNode.parent.data.data as string);
			tmpNode = tmpNode?.parent;
		}
		paths.forEach((path:string) => {
			data = data[path];
		});
		tree.clearTree();
		return data;
	}
	private static findParentPath(dataSource: any,node:Node_){
		let tmpNode = node;
		const paths:string[] = [];
		while (tmpNode?.parent){
			paths.unshift(tmpNode.parent.data.data as string);
			tmpNode = tmpNode?.parent;
		}
		return paths;
	}
}
