<template>
  <v-app>
    <v-toolbar app dense>
      <v-toolbar-title>
      My movie list
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <Moviez/>

    </v-content>
  </v-app>
</template>

<script>
import Moviez from './components/Moviez'

export default {
  name: 'App',
  components: {
    Moviez
  },
  data () {
    return {
      //
    }
  }
}
</script>
