import Mock from 'mockjs'

export const noteList = Mock.mock({
  'data|20': [
    {
      moment: '@datetime',
      'id|+1': 1,
      'message|24-96': '@cword',
      'userId|+1': 10,
      'label|0-10': 0,
      name: '@cname',
      'like|0-1000': 0,
      'comment|0-200': 0,
      'imgUrl|0-5': 0, //这里指颜色背景色
      'revoke|0-20': 0,
      'report|0-20': 0,
      type: 0
    }
  ]
})

export const commentList = Mock.mock({
  'data|20': [
    {
      moment: '@datetime',
      'id|+1': 1,
      'userId|+1': 10,
      'content|6-48': '@cword',
      'label|0-10': 0,
      name: '@cname',
      'avatorColor|0-13': 0 //这里指颜色背景色
    }
  ]
})

export const photoList = Mock.mock({
  'data|20': [
    {
      moment: '@datetime',
      'id|+1': 1,
      'message|24-96': '@cword',
      'userId|+1': 10,
      'label|0-9': 0,
      name: '@cname',
      'like|0-1000': 0,
      'comment|0-200': 0,
      'imgUrl|0-8': 0, //这里指图片
      'revoke|0-20': 0,
      'report|0-20': 0,
      type: 0
    }
  ]
})
