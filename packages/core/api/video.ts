import { Requestmethod } from '../src/types/Request';

export interface VideoListParam extends Record<string, unknown> {
	order?: 'pubdate' | 'click' | 'stow';
	mid?: string;
	keyword?: string;
	pn?: number | undefined;
	ps?: number | undefined;
}
export interface VideoStatParam extends Record<string, unknown> {
	aid?: number;
	bid?: string;
}
export interface videoDescriptionParam extends Record<string, unknown> {
	aid?: number;
	bid?: string;
}
export interface pageListParam extends Record<string, unknown> {
	aid?: number;
	bid?: string;
}
export interface videoShotWebParam extends Record<string, unknown> {
	aid?: number;
	bid?: string;
	cid?: number;
	index?: number;
}

export interface videoIntroduceParam extends Record<string, unknown> {
	aid?: number;
	bvid?: string;
}

export class videoList {
	public static url = 'http://api.bilibili.com/x/space/arc/search';
	public static method:Requestmethod = 'GET';
	public static param: VideoListParam = {
		keyword: undefined,
		pn: undefined,
		ps: undefined,
		mid: undefined,
		order: 'pubdate',
	};
}
export class videoStat {
	public static url = 'http://api.bilibili.com/archive_stat/stat';
	public static methods:Requestmethod = 'GET';
	public static param: VideoStatParam = {
		aid: undefined,
		bid: undefined,
	};
}
export class videoDescription {
	public static url = 'http://api.bilibili.com/x/web-interface/archive/desc';
	public static methods:Requestmethod = 'GET';
	public static param: videoDescriptionParam = {
		aid: undefined,
		bid: undefined,
	};
}
export class pageList {
	public static url = 'http://api.bilibili.com/x/player/pagelist';
	public static methods:Requestmethod = 'GET';
	public static param: pageListParam = {
		aid: undefined,
		bid: undefined,
	};
}
export class videoShotWeb {
	public static url = 'http://api.bilibili.com/x/player/videoshot';
	public static methods:Requestmethod = 'GET';
	public static param: videoShotWebParam = {
		aid: undefined,
		bid: undefined,
		cid: undefined,
		index: undefined,
	};
}

export class videoIntroduce {
	public static url = 'http://api.bilibili.com/x/web-interface/view';
	public static methods:Requestmethod = 'GET';
	public static param: videoIntroduceParam = {
		aid: undefined,
		bvid: undefined,
	};
}
