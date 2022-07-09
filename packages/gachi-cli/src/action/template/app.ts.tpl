import { {{name}} } from './index';
import { config } from './config';
import { gachi } from 'gachi';
async function app(){
    let instance = new gachi(
        config
    )
    instance.run()
}
app().then(()=>{})
