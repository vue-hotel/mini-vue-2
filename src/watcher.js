import Dep from './dep.js'

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key // data 中的属性名
    this.cb = cb // 回调函数负责更新视图

    // 把 watcher 对象记录到 Dep 类的静态属性 target 中
    Dep.target = this
    // 触发 get 方法，在 get 方法中会调用 addSub
    this.oldValue = vm[key]
    Dep.target = null
  }

  /**
   * 当数据发生变化的时候更新视图
   */
  update() {
    const newValue = this.vm[this.key]
    // 数据没有发生变化直接返回
    if (this.oldValue === newValue) {
      return
    }
    // 更新视图
    this.cb(newValue)
  }
}

export default Watcher