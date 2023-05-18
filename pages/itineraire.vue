<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <v-card elevation="10" class="index">
          <v-card-item class="pa-0">
            <div class="d-sm-flex align-center justify-space-between">
              <h5 class="text-h5 mb-0 pl-7 pt-7">
                <v-icon>mdi-navigation</v-icon>&nbsp;&nbsp;&nbsp;
                <u>COMMENT S'Y RENDRE ?</u>
              </h5>
              <slot name="action"></slot>
            </div>
            <v-card-text class="text-center">
              <div id="map" style="height: 600px;"></div>
              <br>
              <a class="btn rounded" :href="getDirectionsLink()" target="_blank">Afficher l'itinéraire</a>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "itineraire",
  mounted() {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAC6yxfl9R8zhl4DvXVUfbFLroLxGYdQ2E&callback=initMap";
    script.defer = true;
    script.async = true;
    script.onload = this.initMap;
    document.head.appendChild(script);
  },
  methods: {
    initMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 42.957677, lng: -0.331247 },
        zoom: 16
      });
      const marker = new google.maps.Marker({
        position: { lat: 42.957677, lng: -0.331247 },
        map: map,
        title: "Gourette"
      });
    },
    getDirectionsLink() {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);

      const destination = "42.957677,-0.331247";
      const encodedDestination = encodeURIComponent(destination);

      if (isIOS) {
        // iOS
        return `maps://maps.apple.com/?daddr=${encodedDestination}&dirflg=d`;
      } else if (isAndroid) {
        // Android
        return `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}`;
      } else {
        // Other platforms
        return `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}`;
      }
    }
  }
}
</script>

<style scoped>
#map {
  height: 400px;
  width: 100%;
}
.btn {
  background-color: blue;
  color: white;
  padding: 10px;
  text-decoration: none;
}
</style>
