import { Realtime } from 'leancloud-realtime'

const realtime = new Realtime({
  appId: 'ysE4GhyDhYkvWQkcIb3U73KH-gzGzoHsz',
  region: 'cn' // 美国节点为 "us"
})

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$realtime', { value: realtime })
  }
}
