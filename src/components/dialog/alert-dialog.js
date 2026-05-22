import { createVNode, render } from 'vue'
import AlertDialog from './AlertDialog.vue'

const divNode = createVNode('div', { class: 'xtx-message-container' })
render(divNode, document.body)

const div = divNode.el

const AlertWindow = ({ message, actionType }) => {
  const comVnode = createVNode(AlertDialog, { message, actionType })
  render(comVnode, div)

  setTimeout(() => {
    render(null, div)
  }, 6000)
}

export default AlertWindow
