import {argv} from 'process'
import { Trie } from '@ethereumjs/trie';
import { Level } from 'level';
import ExecutionContext from './classes/execution';
import LevelDB from './classes/storage';

const main = async ()=>{
    const code = argv[2] ??'0x00';
    const trie = await Trie.create({
        db: new LevelDB(new Level('MY_TRIE_DB_LOCATION')),
        useRootPersistence:true,
    })
    const executionContext = new ExecutionContext(code,trie)

    executionContext.run()
}
main()