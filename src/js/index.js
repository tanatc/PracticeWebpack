/**
 * index.js:webpack入口文件
 */
import '../css/a.css'
import '../less/a.less'
import '../font/iconfont.css'
import './hellowebpack.js'

function add(x, y) {
    return x + y;
}
hello()
console.log(123)
console.log(add(1, 2))
console.log(add(3, 2))
console.log('index被重新加载')