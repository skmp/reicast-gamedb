<template>
  <section-component
    height="0.2"
    bg="#193960"
    color="white"
    class="footer">

    <template slot="content">
      <footer>
        <div class="hidden-xsh">
          <img class="spin" alt="Reicast logo" src="statics/icons/favicon-32x32.png">
        </div>
        <div class="copyright">
          © 2019 {{ $t('app.copyright') }}
        </div>
      </footer>
    </template>
  </section-component>
</template>

<script>
import SectionComponent from './Section.vue'

export default {
  components: { SectionComponent }
}
</script>
