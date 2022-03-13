class Dep {
  constructor() {
    this.subs = []
  }

  /**
   * 添加观察者
   * @param {Watcher} sub 
   */
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  
  /**
   * 发送通知
   */
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

export default Dep