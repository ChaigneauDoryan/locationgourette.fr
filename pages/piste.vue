<template>
  <v-card elevation="10" class="piste">
    <v-card-item class="pa-0">
      <div class="d-sm-flex align-center justify-space-between">
        <h5 class="text-h5 mb-0 pl-7 pt-7">
          <v-icon>mdi-ski</v-icon>&nbsp;&nbsp;&nbsp;
          <u>PLAN DES PISTES</u>
        </h5>
        <slot name="action"></slot>
      </div>
      <slot />
      <v-card-text>
        <div class="text-center">
          <v-btn @click="zoomIn">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn @click="zoomOut">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn @click="resetZoom">
            Réinitialisation
          </v-btn>
          <v-img
            :src="src"
            :height="zoomLevel * 650"
            contain
          />
        </div>
      </v-card-text>
    </v-card-item>
  </v-card>
</template>

<script>
import planDesPistesGourette from '@/assets/images/planDesPistesGourette.jpg';

export default {
  name: 'pistes',
  data() {
    return {
      zoomLevel: 1,
      src: planDesPistesGourette
    };
  },
  methods: {
    zoomIn() {
      this.zoomLevel += 0.2;
    },
    zoomOut() {
      this.zoomLevel = Math.max(this.zoomLevel - 0.2, 0.2);
    },
    resetZoom() {
      this.zoomLevel = 1;
    },
  },
};
</script>

<style>
.piste {
  max-width: 1500px;
  margin: 0 auto;
}
</style>

