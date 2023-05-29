<template>
  <v-row>
    <v-col v-for="(address, index) in addresses" :key="index" cols="12" md="4">
      <v-card elevation="10" class="address">
        <v-card-item class="pa-0">
          <div class="d-sm-flex align-center justify-space-between">
            <h5 class="text-h5 mb-0 pl-7 pt-7">
              <v-icon>{{ address.icone }}</v-icon>&nbsp;&nbsp;&nbsp;
              <u v-if="!address.lien">{{ address.nom }}</u>
              <a v-else :href="address.lien ? address.lien : '#'" target="_blank" class="lien">{{ address.nom }}</a>
            </h5>
            <slot name="action"></slot>
          </div>
          <br>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  head() {
    return {
      title: 'Adresses utiles',
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: "Retrouvez toutes les adresses utiles à proximité de l'appartement."
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'author', content: 'Stéphane Chaigneau' },
        {
          name: "keywords",
          content: 'adresses utiles, adresse utile, location gourette, location Gourette, Location gourette, Location Gourette, Location appartement gourette, Location appartement Gourette, location appartement Gourette, appartement gourette, appartement Gourette, Appartement Gourette'
        },
        { property: "og:title", content: "Adresses utiles" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://locationgourette.fr/adressesUtiles" },
        { property: "og:site_name", content: "Gourette - Location Appartement" },
        {
          property: "og:description",
          content: "Retrouvez toutes les adresses utiles à proximité de l'appartement."
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
      addresses: [
        { icone: 'mdi-map-marker', nom: 'Office de tourisme', description: '', lien: 'https://www.gourette.com' },
        { icone: 'mdi-ski', nom: 'Ecole de Ski Française', description: '', lien: 'https://www.esf-gourette.com/' },
        { icone: 'mdi-ticket', nom: "N'PY", description: '', lien: 'https://www.n-py.com/fr/ete/gourette/' },
        { icone: 'mdi-ski', nom: 'Location de ski', description: '', lien: '' },
        { icone: 'mdi-movie', nom: 'Cinéma', description: '', lien: 'https://www.cinefil.com/cinema/cinema-de-gourette-gourette/programmation' },
        { icone: 'mdi-store', nom: 'Supérette', description: '', lien: '' },
        { icone: 'mdi-basket', nom: 'Marché', description: '', lien: '' },
        { icone: 'mdi-food', nom: 'Chez Régis', description: '', lien: '' },
        { icone: 'mdi-food', nom: 'Le Cairn', description: '', lien: '' },
        { icone: 'mdi-food', nom: 'La québotte', description: '', lien: '' },
        { icone: 'mdi-terrain', nom: "Col de l'aubisque", description: '', lien: 'https://www.gourette.com/decouvrir/le-col-d-aubisque/' },
        { icone: 'mdi-train', nom: "Petit train d'Artouste", description: '', lien: 'https://artouste.fr/ete/le-train-dartouste/' }
      ]
    };
  }
};
</script>

<style>
.lien {
  color: blue;
}

.address {
   max-width: 450px;
   margin: 0 auto;
 }
</style>
