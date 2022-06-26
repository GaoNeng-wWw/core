import { ClientRequest, request as req_http } from 'http';
import { request as req_https } from 'https';
import { stringify } from 'querystring';
import { requestMiddleware, RequestOption } from '../types/Request';
import {box} from '../Box/box';
import { Box } from '../types/Box';

let m:requestMiddleware = {};

export function setMid(mid: requestMiddleware){m=mid;}

export async function http(option: RequestOption): Promise<Record<string, any>>{
	return new Promise((resolve,reject)=>{
		let d = '';
		const req = req_http(option.value, (res)=>{
			let isFail = res.statusMessage !== 'OK'
			res.on('data', (chunk:any)=>{
				d+=chunk.toString();
			});
			res.on('close',()=>{resolve({data: d, isFail});});
		});
		if (option.value.method === 'POST'){
			req.write(
				stringify(option.value.param as any), (err)=>{
					if (err){
						reject({
							name: err.name,
							stack: err.stack,
							message: err.message
						});
					}
				}
			);
		}
		req.on('error', (err: Error)=>{
			if (err){
				reject({
					name: err.name,
					stack: err.stack,
					message: err.message,
				});
			}
		});
		req.end();
	});
}

export function https(option:RequestOption): Promise<Record<string, any>>{
	return new Promise((resolve,reject)=>{
		let d = '';
		const req = req_https(option.value, (res)=>{
			const isFail = res.statusMessage !== 'OK';
			res.on('data',(chunk)=>{
				d += chunk.toString();
			});
			res.on('close', ()=>{
				resolve({data: d, isFail});
			});
		});
		if (option.value.method === 'POST'){
			req.write(
				stringify(option.value.param as any),
				(err)=>{
					if (err){
						reject({
							name: err.name,
							stack: err.stack,
							message: err.message,
						});
					}
				}
			);
		}
		req.on('error', (err: Error)=>{
			if (err){
				reject({
					name: err.name,
					stack: err.stack,
					message: err.message,
				});
			}
		});
		req.end();
	});
}
