import { noteList as mockNoteList } from '@/../mock/index.js'
import { insertWallApi } from '@/api/request'

export const submitTestData = async () => {
  for (const item of mockNoteList.data) {
    const saveData = {
      type: 0,
      message: item.message,
      name: item.name,
      userId: item.userId || '0',
      moment: new Date(),
      label: item.label,
      color: item.color,
      imgUrl: item.imgUrl
    }
    await insertWallApi(saveData)
  }
}
