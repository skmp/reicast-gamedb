<template>
  <section-component
    :heading="true"
    :height="0.8"
    bg="#f7f7f7"
    color="#38478c"
    :title="$t('app.links')"
    class="about row">

    <template slot="content">
      <div class="col-md-8 offset-md-2">
        <div class="row">
          <div v-for="(link, key) in appLinks"
               class="col-sm-4 col-xs-6 link-wrapper"
               :key="key">
            <q-btn class="link"
                   :icon="$t(link.icon)"
                   :label="$t(link.label)"
                   @click.native="openURL($t(link.url))"/>
          </div>
          <div class="margin-auto">
            <a href="mailto:team@reicast.com">
              <q-btn class="link"
                     color="primary"
                     icon="fas fa-envelope"
                     label="email"/>
            </a>
          </div>
        </div>
        <p>{{ $t('igdb_attribution') }}</p>
      </div>
    </template>
  </section-component>
</template>

<script>
import SectionComponent from '../Section.vue'
import { openURL } from 'quasar'

export default {
  components: { SectionComponent },
  data () {
    return {
      appLinks: this.$t('appLinks', { returnObjects: true })
    }
  },
  methods: {
    openURL
  }
}
</script>

<style scoped>
  .link {
   width: 160px;
  }
  @media (min-height: 269px) {
    .link-wrapper {
      height: 60px;
    }
  }
</style>
