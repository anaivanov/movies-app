<template>
    <v-container>
        <v-layout text-xs-center wrap justify-center>
            <v-flex xs12 md6>
                <v-autocomplete :loading="loading" :items="items" item-text="title" item-value="id" @change="addFav(selectedId)" :search-input.sync="search" v-model="selectedId" cache-items class="mx-3" flat hide-no-data hide-details label="Add movie to list" solo-inverted clearable ></v-autocomplete>
            </v-flex>
        </v-layout>
            <v-layout wrap>
                <v-flex xs3 md2 v-for="id in favMovies" v-bind:key="id">
                    <Card :idcard="id" @delete="deleteCard(id)"/>
                </v-flex>
            </v-layout>
    </v-container>
</template>

  <script>
import axios from "axios";
import Card from './Card'
export default {
  components:
    {Card},
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
      axios.post(process.env.VUE_APP_BACKEND_PATH + "film", {
        tmdbId:id
      })
      .then(response => {
        this.favMovies.push(id)
        this.search = null;
      })
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
    },
    deleteCard(id) {
      axios.delete(process.env.VUE_APP_BACKEND_PATH + "film/" +id)
      .then(response => {this.favMovies.splice(this.favMovies.indexOf(id),1)})
    }
  },
  created: function () {
    let self=this;
    // console.log(process.env.VUE_APP_BACKEND_PATH)
    axios
        .get(process.env.VUE_APP_BACKEND_PATH + "films")
        .then(function(response) {
          self.favMovies = response.data.map(x => x.tmdbId)
        })
  }
};
</script>

<style>
</style>
