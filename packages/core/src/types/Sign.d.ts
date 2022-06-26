type sign = 'open' | 'shutdown';
export declare interface payload{
    id?: string;
    sign?: sign;
    exitCode: 1 | -1 | 0;
    reason?: string;
    message?: string;
}
export declare interface signConfig {
    id: string;
    createTime?: number;
    server?:{
        type: 'ws'|'wss'
        location: string;
        port: string;
        path: string;
    }
}