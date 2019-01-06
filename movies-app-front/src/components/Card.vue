<template>
  <div v-if="carddata.id" style="height: 100%">

    <v-card height="100%" v-show="!flipped">
      <v-img aspect-ratio="0.66" :src="'https://image.tmdb.org/t/p/w185' + carddata.poster_path"></v-img>
      <v-card-title>
        <div>
          <h3 class="subheading ma-0 mb-4">{{carddata.original_title}}</h3>
        </div>
      </v-card-title>
      <span class="actions">
        <v-btn icon @click="flipped=!flipped">
          <v-icon>flip_to_back</v-icon>
        </v-btn>
        <v-btn icon v-on:click="$emit('delete')">
          <v-icon>delete</v-icon>
        </v-btn>
      </span>
    </v-card>

    <v-card height="100%" v-show="flipped">
      <div class="overview">{{carddata.overview}}</div>
      <span class="actions">
        <v-btn icon @click="flipped=!flipped">
          <v-icon>flip_to_front</v-icon>
        </v-btn>
        <v-btn icon v-on:click="$emit('delete')">
          <v-icon>delete</v-icon>
        </v-btn>
      </span>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["idcard"],
  data() {
    return {
      carddata: {},
      flipped: false
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
<style scoped>
.actions {
  position: absolute;
  bottom: 0px;
}

.overview{
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: auto;
  max-height: 21.6em;
  line-height: 1.8em;

  padding: 10px;
  margin-bottom: 50px;
}
</style>
