<template>
  <div class="home">
    <top-bar></top-bar>
    <wall-message></wall-message>
    <foot-bar></foot-bar>
  </div>
</template>

<script>
// @ is an alias to /src
import FootBar from '@/components/FootBar.vue'
import TopBar from '@/components/TopBar.vue'
import WallMessage from './WallMessage.vue'
import { useAppStore } from '@/store'

export default {
  name: 'MainIndex',
  data() {
    return {}
  },
  components: {
    TopBar,
    FootBar,
    WallMessage
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      const store = useAppStore()
      store.dispatch('fetchUser')
    }
  }
}
</script>
