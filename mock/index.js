import Mock from 'mockjs'

export const noteList = Mock.mock({
  'data|20': [
    {
      moment: '@datetime',
      'id|+1': 1,
      'message|24-96': '@cword',
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
