<template>
  <section-component
    bg="#04575d"
    color="white"
    :class="sectionClass">

    <div class="basic-container" slot="content">
      <div>
        <h4>{{ $t('Game Releases') }}</h4>
        <p>
          <v-table :fields="Object.keys(gameData.releases[0])"
                   wrapperClass="other"
                   :rows="gameData.releases">
          </v-table>
        </p>
      </div>

      <div v-if="gameData.summary">
        <h4>{{ $t('Summary') }}</h4>
        <p>{{ gameData.summary }}</p>
      </div>

      <div v-if="gameData.storyline">
        <h4>{{ $t('Storyline') }}</h4>
        <p>{{ gameData.storyline }}</p>
      </div>
    </div>
  </section-component>
</template>

<script>
import SectionComponent from './Section.vue'
import VTable from '../components/Table'

export default {
  components: { SectionComponent, VTable },
  props: {
    sectionClass: {
      type: String,
      required: true
    }
  },
  computed: {
    gameData () {
      return this.$store.state.routing.currentGame
    }
  }
}
</script>
<style scoped>
  p {
    text-align: justify;
  }
</style>
