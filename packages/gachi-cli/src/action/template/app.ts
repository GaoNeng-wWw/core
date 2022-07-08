import {Spider} from './index';
import {config} from './config';
async function app(){
    let instance = new gachi(
        config
    )
    instance.run()
}
await app();
export{}