import { Requestmethod } from '../src/types/Request';
export interface UserCardParam extends Record<string, unknown> {
	mid?: string;
	photo?: true | false;
}
export interface userSpaceParam extends Record<string, unknown> {
	mid?: string;
}
export interface userInfoParam extends Record<string, unknown> {
	mid?: string;
}

export class userInfo {
	static url = 'http://api.bilibili.com/x/space/acc/info';
	static method:Requestmethod = 'GET';
	static param: userInfoParam = { mid: '' };
}

export class userSpace {
	public static url = 'http://api.bilibili.com/x/space/acc/info';
	public static method:Requestmethod = 'GET';
	public static param: userSpaceParam = { mid: '' };	
}

export class userCard {
	public static url = 'http://api.bilibili.com/x/web-interface/card';
	public static method:Requestmethod = 'GET';
	public static param: UserCardParam = { mid: '', photo: true };
}

