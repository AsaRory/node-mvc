import {Container} from "typedi";

import {init} from './test3'
init();
console.log('Container.get(\'test\');=',Container);