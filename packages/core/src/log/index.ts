import {resolve} from 'path';
import {writeFileSync, existsSync, statSync} from 'fs';
interface logConfig {
    write?:boolean;    
    location?: string;
}
class log {
    private location: string = '';
    private isWrite: boolean;
    private limit: number = 1;
    /**
     * 
     * @param write will write to file?
     * @param location write log to here
     */
    constructor(config: logConfig){
        this.isWrite = config.write || false;
        if (config.write){
            this.location = `${resolve('.')}\\${config.location || 'log'}`;
        }
    }
    private write(msg: string){
        if (this.isWrite){
            let stat;
            try {
                stat = statSync(this.location)
            } catch {
                writeFileSync(this.location, '');
            }
            writeFileSync(this.location, msg, {mode: 'a+'});
        }
    }
    public debug(msg: string){
        let str = `[debug][gachi][${new Date().getTime()}]${msg}`;
        console.log(str);
        this.write(msg);
    }
    public info(msg: string){
        let str = `[info][gachi][${new Date().getTime()}]${msg}`;
        console.log(str);
        this.write(msg);
    }
    public error(msg: string){
        let str = `[][gachi][${new Date().getTime()}]${msg}`;
        console.log(str);
        this.write(msg);
    }
}