import service from '@/utils/axios'

// 创建Wall
const insertWallApi = (param) => service.post('/insertWall', param)

// 添加评论
const insertCommentApi = (param) => service.post('/insertComment', param)

//点赞
const insertFeedbackApi = (param) => service.post('/insertFeedback', param)

// 获取ip
const getUserIp = () => service.post('/signip')

// 获取wall列表
const findWallPage = (param) => service.post('/findWallPage', param)

export {
  insertWallApi,
  insertCommentApi,
  insertFeedbackApi,
  getUserIp,
  findWallPage
}
