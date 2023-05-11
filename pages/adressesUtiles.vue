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
   max-width: 500px;
   margin: 0 auto;
 }
</style>
