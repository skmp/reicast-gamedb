<template>
  <div class="miles">
    <router-view />
  </div>
</template>

<script>

export default {
  mounted () {
    document.body.classList.remove('no-scroll-bar')
  }
}
</script>
