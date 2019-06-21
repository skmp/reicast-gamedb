<template>
  <q-page class="flex flex-center">
    Report test {{ $route.params.id }}
    <img alt="Reicast" src="statics/reicast-logo.png">
  </q-page>
</template>

<style>
</style>

<script>
import { DESCRIPTION } from '../constants/head'

export default {
  name: 'Reports',
  metaInfo () {
    const title = `Reports for: ${this.$route.params.id}`
    const desc = `Reports description for ${this.$route.params.id}`
    return {
      title: title,
      meta: [{
        vmid: DESCRIPTION,
        name: DESCRIPTION,
        content: desc
      }]
    }
  }
}
</script>
