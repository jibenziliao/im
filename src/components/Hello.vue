<template>
  <section class="container">
    <div
      class="chat-content"
      ref="chatContent"
      id="chatContent"
      onresize="resizeHeight">
      <message
        v-for="(item, index) in msgs"
        :key="index"
        :date="item.date"
        :is-self="item.isSelf"
        :content="item.content"
        :avatar="item.avatar">
      </message>
    </div>
    <chat-input
     @send="sendContent">
    </chat-input>
  </section>
</template>

<script>
import Message from '../components/Message'
import ChatInput from '../components/ChatInput'
import { TextMessage } from 'leancloud-realtime'
export default {
  name: 'hello',
  data () {
    return {
      userId: '001',
      token: '884f6767f101fdfe1c5574dfbd94301a',
      uuid: '1a2787c9-8da0-45e8-8051-21f5daa97ace',
      targetUuid: 'e604205d-ddb4-45f9-be82-83d9f4fe0003',
      conversationId: '595303a2a22b9d00591ae6cb',
      inputContent: '',
      userDelegate: null,
      conversation: null,
      oContent: {},
      oTextarea: {},
      emojis: ['😂', '🙏', '😄', '😏', '😇', '😅', '😌', '😘', '😍', '🤓', '😜', '😎', '😊', '😳', '🙄', '😱', '😒', '😔', '😷', '👿', '🤗', '😩', '😤', '😣', '😰', '😴', '😬', '😭', '👻', '👍', '✌️', '👉', '👀', '🐶', '🐷', '😹', '⚡️', '🔥', '🌈', '🍏', '⚽️', '❤️', '🇨🇳'],
      isShowEmoji: false,
      isRedAI: false,
      msg: null,
      msgContent: '',
      msgs: [{
        isSelf: false,
        content: '你好',
        name: '张三',
        avatar: 'http://oatl31bw3.bkt.clouddn.com/735510dbjw8eoo1nn6h22j20m80m8t9t.jpg',
        date: '2015-11-09 09:57:08'
      }, {
        isSelf: true,
        content: '这篇文有点长。但是我相信，如果你认真读完，一定能有所收获。如果你刚刚开始写作，你会发现让你更快进步的方法。如果你已经写了一段时间，但还没有找到方向，这篇文章也能提供你一个新的思考角度。愿你不忘初心，快乐写下去！',
        name: '张三',
        avatar: 'http://oatl31bw3.bkt.clouddn.com/735510dbjw8eoo1nn6h22j20m80m8t9t.jpg',
        date: '2015-11-09 09:57:08'
      }, {
        isSelf: false,
        content: '你好',
        name: '张三',
        avatar: 'http://oatl31bw3.bkt.clouddn.com/735510dbjw8eoo1nn6h22j20m80m8t9t.jpg',
        date: '2015-11-09 09:57:08'
      }, {
        isSelf: false,
        content: '你好',
        name: '张三',
        avatar: 'http://oatl31bw3.bkt.clouddn.com/735510dbjw8eoo1nn6h22j20m80m8t9t.jpg',
        date: '2015-11-09 09:57:08'
      }]
    }
  },
  components: {
    Message,
    ChatInput
  },
  methods: {
    async sendContent (content) {
      let result = await this.conversation.send(new TextMessage(content))
      console.log(result)
      let tmpObj = {
        isSelf: true,
        content: content,
        name: '张三',
        avatar: 'http://oatl31bw3.bkt.clouddn.com/735510dbjw8eoo1nn6h22j20m80m8t9t.jpg',
        date: '2015-11-09 09:57:08'
      }
      document.body.scrollTop = document.body.scrollHeight
      this.msgs.push(tmpObj)
    },
    async init () {
      this.userDelegate = await this.$realtime.createIMClient(this.uuid)
      this.conversation = await this.userDelegate.createConversation({
        members: [this.uuid, this.targetUuid],
        name: '普通聊天',
        unique: true //  是否创建唯一对话，当其为 true 时，如果当前已经有相同成员的对话存在则返回该对话，否则会创建新的对话。
      })
      /* this.$realtime.createIMClient('Tom').then(tom => {
        // 创建与Jerry之间的对话
        return tom.createConversation({
          members: ['Jerry'],
          name: 'Tom & Jerry'
        })
      }).then(conversation => {
        // 发送消息
        return conversation.send(new TextMessage('耗子，起床！'))
      }).then(message => {
        console.log('Tom & Jerry', '发送成功！')
      }).catch(console.error) */
    },
    async send () {
      let result = await this.conversation.send(new TextMessage('你好'))
      console.log(result)
      let tmpObj = {
        isSelf: true,
        content: '你好',
        name: '张三',
        avatar: 'http://oatl31bw3.bkt.clouddn.com/735510dbjw8eoo1nn6h22j20m80m8t9t.jpg',
        date: '2015-11-09 09:57:08'
      }
      document.body.scrollTop = document.body.scrollHeight
      this.msgs.push(tmpObj)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/mixin.scss';

.container {
  @include pm2rem(padding, 88px, 0px, 100px, 0px);
}
</style>
