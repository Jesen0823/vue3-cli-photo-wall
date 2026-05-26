import { noteList as mockNoteList, commentList } from '@/../mock/index.js'
import { insertCommentApi, insertWallApi } from '@/api/request'

export const submitTestData = async () => {
  for (const item of mockNoteList.data) {
    const saveData = {
      type: 0,
      message: item.message,
      name: item.name,
      userId: item.userId || '0',
      moment: new Date(),
      label: item.label,
      color: item.imgUrl,
      imgUrl: item.imgUrl
    }
    await insertWallApi(saveData)
  }
}

export const submitCmtTestData = async (id) => {
  for (const item of commentList.data) {
    const param = {
      wallId: id,
      userId: item.userId,
      imgUrl: item.avatorColor,
      comment: item.content,
      name: item.name,
      moment: new Date()
    }
    await insertCommentApi(param)
  }
}
