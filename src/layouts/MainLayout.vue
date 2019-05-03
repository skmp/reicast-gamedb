<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="fa fa-bars" />
        </q-btn>

        <q-toolbar-title>
          {{ $t('app.name') }}
          <div slot="subtitle">{{ $t('app.description') }} v{{ $t('app.version') }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      behavior="mobile"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>{{ $t('app.links') }}</q-list-header>
        <q-item v-for="(link, key) in appLinks"
                :key="key"
          @click.native="openURL($t(link.url))">
          <q-item-side :icon="$t(link.icon)" />
          <q-item-main :label="$t(link.label)" :sublabel="$t(link.sub)" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      appLinks: this.$t('appLinks', { returnObjects: true })
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
