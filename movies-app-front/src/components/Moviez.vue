<template>
  <v-container>
    <v-layout text-xs-center wrap justify-center>
      <v-flex xs12 md6>
        <v-autocomplete
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          v-model="select"
          cache-items
          class="mx-3"
          flat
          hide-no-data
          hide-details
          label="Add movie to list"
          solo-inverted
        ></v-autocomplete>
      </v-flex>
    </v-layout>
  </v-container>
</template>

  <script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    querySelections(v) {
      let self=this;
      this.loading = true;
      axios
        .get("/tmdb/3/search/movie?query="+v)
        .then(function(response) {
          self.loading = false
          self.items = response.data.results.map(x=>x.title)
        })
    }
  }
};
</script>

<style>
</style>
