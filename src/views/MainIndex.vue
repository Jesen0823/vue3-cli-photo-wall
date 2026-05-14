<template>
  <div class="home">
    <top-bar></top-bar>
    <wall-message></wall-message>
    <foot-bar></foot-bar>
  </div>
</template>

<script>
// @ is an alias to /src
import request from '@/api/request'
import FootBar from '@/components/FootBar.vue'
import TopBar from '@/components/TopBar.vue'
import WallMessage from './WallMessage.vue'

export default {
  name: 'MainIndex',
  components: {
    TopBar,
    FootBar,
    WallMessage
  },
  methods: {
    getUser() {
      request
        .post('', {
          data: 'aaa',
          pwd: '123'
        })
        .then((result) => {
          console.log(result)
        })
    }
  }
}
</script>
