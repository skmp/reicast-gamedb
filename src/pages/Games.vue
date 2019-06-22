<template>
  <div class="games-list">
    <games-header/>
    <!-- The Gamelist component - the second nested child.
     Inherits url query params direct from router-->
    <router-view />
    <Footer/>
    <pre-render-injection/>
  </div>

</template>
<script>
import { DESCRIPTION } from '../constants/head'
import GamesHeader from '../components/miles/games/GamesHeader'
import Footer from '../components/common/Footer'
import PreRenderInjection from '../components/common/PreRenderInjection'

export default {
  components: { GamesHeader, Footer, PreRenderInjection },
  metaInfo () {
    // TODO: generate and feed appropriate meta desc, etc
    return {
      title: this.title,
      game: '',
      meta: [{
        vmid: DESCRIPTION,
        name: DESCRIPTION,
        content: this.title
      }]
    }
  }
}
</script>
