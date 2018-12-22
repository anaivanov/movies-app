<template>
  <v-container>
    <v-layout text-xs-center wrap justify-center>
      <v-flex xs12 md6>
        <v-autocomplete
          :loading="loading"
          :items="items"
          item-text="title"
          item-value="id"
          @change="addFav(selectedId)"
          :search-input.sync="search"
          v-model="selectedId"
          cache-items
          class="mx-3"
          flat
          hide-no-data
          hide-details
          label="Add movie to list"
          solo-inverted
          clearable
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
      selectedId: null,
      favMovies: []
    };
  },
  watch: {
    search(val) {
      val && val !== this.selectedId && this.querySelections(val);
    }
  },
  methods: {
    addFav(id){
      this.favMovies.push(id)
      let search = this.search
      this.search=null;
      this.search = null;
      // setTimeout(() => { this.search = null; }, 100);
      // POST request
      console.log(id)
    },
    querySelections(v) {
      let self=this;
      this.loading = true;
      axios
        .get(process.env.VUE_APP_BACKEND_PATH + "tmdb/3/search/movie?query="+v)
        .then(function(response) {
          self.loading = false
          self.items = response.data.results
        })
    }
  },
  created: function () {
    // console.log(process.env.VUE_APP_BACKEND_PATH)
  }
};
</script>

<style>
</style>
