import Observer from "./observer.js"
import Compiler from "./compiler.js"

class Vue {
  constructor(options) {
    // 1. 保存 options的数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    // 2. 为方便调用（this.msg），把 data 中的成员转换成 getter 和 setter，并注入到 Vue 实例中
    this._proxyData(this.$data)
    // 3. 调用 Observer 类，监听数据的变化
    new Observer(this.$data)
    // 4. 调用 compiler 类，解析指令和插值表达式
    new Compiler(this)
  }

  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if (newValue === data[key]) {
            return
          }
          data[key] = newValue
        }
      })
    })
  }
}

export default Vue