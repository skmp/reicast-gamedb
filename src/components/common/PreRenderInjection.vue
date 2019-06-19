<template>
  <input v-if="!$q.platform.is.cordova && !$q.platform.is.electron"
         type="hidden" name="spaPreRenderElement" value=""/>
</template>
