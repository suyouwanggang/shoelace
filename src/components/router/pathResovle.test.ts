import { isPathURLMatchPattern, getPathNames, defaultResove, joinStringPath, stripExtraTrailingSlash } from './pathResovle';

console.log('/list', '/list', isPathURLMatchPattern('/list', '/list'));
console.log('/list/1000', '/list/:id', isPathURLMatchPattern('/list/1000', '/list/:id'));
console.log('/wanggang/list/1000', '/list/:id', isPathURLMatchPattern('/wanggang/list/1000', '/list/:id'));
console.log('/list/1000', '/list/:name', isPathURLMatchPattern('/list/1000', '/list/:name'));
console.log('/list/1000/test', '/list/:id/:name', isPathURLMatchPattern('/list/1000/test', '/list/:id/:name'));




console.log('/list', '/list', getPathNames('/list', '/list'));
console.log('/list/1000', '/list/:id', getPathNames('/list/1000', '/list/:id'));
console.log('/wanggang/list/1000', '/list/:id', getPathNames('/wanggang/list/1000', '/list/:id'));
console.log('/list/1000', '/list/:name', getPathNames('/list/1000', '/list/:name'));
console.log('/list/1000/test', '/list/:id/:name', getPathNames('/list/1000/test', '/list/:id/:name'));


console.log('/list/:id', { id: 1000 }, defaultResove.toPath('/list/:id', { id: 1000 }));
console.log('/list/:id/:name', { id: 1001, name: '王刚' }, defaultResove.toPath('/list/:id/:name', { id: 1000, name: '王刚' }));
console.log('/list/:id', { id: 1002 }, defaultResove.toPath('/list/:id', { id: 1000 }));


console.log('stripExtraTrailingSlash', '/c//c/d', stripExtraTrailingSlash('/c//c/d'));
console.log('stripExtraTrailingSlash', '/c//c/d/', stripExtraTrailingSlash('/c//c/d/'));

console.log('joinStringPath', '/d', '/b', '/c', '*', joinStringPath('/', '/b', '/c', '*'));
console.log('joinStringPath', '/f', '//b', '/c', '', joinStringPath('/', '/b', '/c', ''));
console.log('joinStringPath', '/d', 'b', '/c', '', joinStringPath('/d', 'b', '/c', ''));
console.log('joinStringPath', '/d', 'b', '//c', '', joinStringPath('/d', 'b', '//c', ''));
console.log('joinStringPath', '/a', 'b', '//c', '/ds/es', joinStringPath('/a', '/b', '/c', '/ds/es'));
console.log('joinStringPath', '', 'b', '//c', '/ds/es', joinStringPath('', '/b', '/c', '/ds/es'));