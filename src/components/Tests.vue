<template>
  <section-component
    :class="objectKey"
    :heading="false"
    bg="#D2D4C8"
    color="black"
    :title="$t(`gamePage.${objectKey}`)">

    <template slot="content">

    </template>
  </section-component>
</template>

<script>
import SectionComponent from './Section.vue'

export default {
  components: { SectionComponent },
  props: {
    objectKey: {
      type: String,
      required: true
    }
  }
}
</script>
