<template>
 <v-card v-if="carddata.id">
        <v-img
          :src="'https://image.tmdb.org/t/p/w185' + carddata.poster_path"
        ></v-img>

        <v-card-title primary-title>
          <div>
              <h3 class="headline mb-0">{{carddata.original_title}}</h3>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat >Share</v-btn>
          <v-btn flat v-on:click="$emit('delete')">Delete</v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
import axios from "axios";
export default {
  props: ["idcard"],
  data() {
    return {
      carddata: {}
    };
  },
  created: function() {
    let self = this;
    axios
      .get(process.env.VUE_APP_BACKEND_PATH + "tmdb/3/movie/" + this.idcard)
      .then(function(response) {
        self.carddata = response.data;
      });
  }
};
</script>
