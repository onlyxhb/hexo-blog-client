
import { notification } from 'antd'
export default (message, type = 'success') => {
  // 使用ant的通知
  notification[type]({
    message: '友情提示',
    description: message
  })
  // 使用系统通知
  new window.Notification('友情提示', {
    title: '友情提示',
    body: message
  })
}