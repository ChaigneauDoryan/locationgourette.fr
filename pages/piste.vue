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
            Réinitialiser
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
import planDesPistesGourette from '@/assets/images/planDesPistesGourette.webp';

export default {
  name: 'pistes',
  head() {
    return {
      title: 'Plan des pistes',
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: "Accès au plan des pistes."
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'author', content: 'Stéphane Chaigneau' },
        {
          name: "keywords",
          content: 'plan, piste, plan des pistes, location gourette, location Gourette, Location gourette, Location Gourette, Location appartement gourette, Location appartement Gourette, location appartement Gourette, appartement gourette, appartement Gourette, Appartement Gourette'
        },
        { property: "og:title", content: "Plan des pistes" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://locationgourette.fr/piste" },
        { property: "og:site_name", content: "Gourette - Location Appartement" },
        {
          property: "og:description",
          content: "Accès au plan des pistes."
        },
        { property: "og:locale", content: "fr_FR" },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap' },
      ]
    };
  },
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

