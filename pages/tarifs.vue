<template>
  <!-- Tarifs et Disponibilités -->
  <v-card elevation="10" class="tarifs">
    <v-card-item class="pa-0">
      <div class="d-sm-flex align-center justify-space-between">
        <h5 class="text-h5 mb-0 pl-7 pt-7">
          <v-icon>mdi-tag</v-icon>&nbsp;&nbsp;&nbsp;
          <u>Tarifs et Disponibilités</u>
        </h5>
        <slot name="action"></slot>
      </div>
      <slot />
      <v-card-text>
        <div class="text-center">
          <v-row>
            <v-col
              v-for="(month, index) in months"
              :key="index"
              :cols="isMobile ? 12 : 6"
            >
              <v-card>
                <v-card-title class="text-h6">{{ month }}</v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="getMonthData(month)"
                  :items-per-page="10"
                  class="elevation-1"
                  hide-default-footer
                >
                  <template v-slot:item.disponible="{ item }">
                    <td :class="{ 'disponible': item.disponible, 'non-disponible': !item.disponible }">
                      {{ item.disponible ? 'Disponible' : 'Non disponible' }}
                    </td>
                  </template>
                  <template v-slot:item.start="{ item }">
                    <td>{{ formatDate(item.start) }} - {{ formatDate(item.end) }}</td>
                  </template>
                  <template v-slot:item.tarif="{ item }">
                    <td v-if="item.tarif !== 0">{{ item.tarif }} €</td>
                    <td v-else></td>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card-item>
  </v-card>
</template>

<script>
export default {
  name: 'contact',
  data() {
    return {
      semaines: [
        { start: '2024-01-06', end: '2024-01-13', tarif: 0, disponible: false },
        { start: '2024-01-13', end: '2024-01-17', tarif: 0, disponible: false },
        { start: '2024-01-17', end: '2024-01-20', tarif: 0, disponible: false },
        { start: '2024-01-20', end: '2024-01-27', tarif: 0, disponible: false },
        { start: '2024-01-27', end: '2024-02-03', tarif: 0, disponible: false },
        { start: '2024-02-03', end: '2024-02-10', tarif: 0, disponible: false },
        { start: '2024-02-10', end: '2024-02-17', tarif: 0, disponible: false },
        { start: '2024-02-17', end: '2024-02-24', tarif: 0, disponible: false },
        { start: '2024-02-24', end: '2024-03-02', tarif: 0, disponible: false },
        { start: '2024-03-02', end: '2024-03-09', tarif: 0, disponible: false },
        { start: '2024-03-09', end: '2024-03-16', tarif: 0, disponible: false },
        { start: '2024-03-16', end: '2024-03-23', tarif: 0, disponible: false },
        { start: '2024-03-23', end: '2024-03-30', tarif: 0, disponible: false },
        { start: '2024-03-30', end: '2024-04-06', tarif: 0, disponible: false },
        { start: '2024-04-06', end: '2024-04-13', tarif: 0, disponible: false },
        { start: '2024-04-13', end: '2024-04-20', tarif: 0, disponible: false },
        { start: '2024-04-20', end: '2024-04-27', tarif: 0, disponible: false },
        { start: '2024-04-27', end: '2024-05-04', tarif: 0, disponible: false },
        { start: '2024-05-04', end: '2024-05-11', tarif: 0, disponible: false },
        { start: '2024-05-11', end: '2024-05-18', tarif: 0, disponible: false },
        { start: '2024-05-18', end: '2024-05-25', tarif: 0, disponible: false },
        { start: '2024-05-25', end: '2024-06-01', tarif: 0, disponible: false },
        { start: '2024-06-01', end: '2024-06-08', tarif: 0, disponible: false },
        { start: '2024-06-08', end: '2024-06-15', tarif: 0, disponible: false },
        { start: '2024-06-15', end: '2024-06-22', tarif: 0, disponible: false },
        { start: '2024-06-22', end: '2024-06-29', tarif: 0, disponible: false },
        { start: '2024-06-29', end: '2024-07-06', tarif: 250, disponible: true },
        { start: '2024-07-06', end: '2024-07-13', tarif: 250, disponible: true },
        { start: '2024-07-13', end: '2024-07-20', tarif: 250, disponible: true },
        { start: '2024-07-20', end: '2024-07-27', tarif: 250, disponible: true },
        { start: '2024-07-27', end: '2024-08-03', tarif: 250, disponible: true },
        { start: '2024-08-03', end: '2024-08-10', tarif: 250, disponible: true },
        { start: '2024-08-10', end: '2024-08-17', tarif: 250, disponible: true },
        { start: '2024-08-17', end: '2024-08-24', tarif: 250, disponible: true },
        { start: '2024-08-24', end: '2024-08-31', tarif: 250, disponible: true },
        { start: '2024-08-31', end: '2024-09-07', tarif: 250, disponible: true },
        { start: '2024-09-07', end: '2024-09-14', tarif: 250, disponible: true },
        { start: '2024-09-14', end: '2024-09-21', tarif: 250, disponible: true },
        { start: '2024-09-21', end: '2024-09-28', tarif: 250, disponible: true }
      ],
      
      search: '',
      headers: [
        { text: 'Semaine', value: 'start', align: 'left', clearable: true, sortable: false },
        { text: 'Tarif', value: 'tarif', align: 'left', clearable: true, sortable: false },
        { text: 'Disponibilité', value: 'disponible', align: 'left', clearable: true, sortable: false }
      ],
    };
  },
  computed: {
    months() {
      return [...new Set(this.semaines.map(semaine => new Date(semaine.start).toLocaleDateString('fr-FR', { month: 'long' })))];
    },
    isMobile() {
      return this.$vuetify.breakpoint.name === 'xs';
    },
  },
  methods: {
    getMonthData(month) {
      return this.semaines.filter(semaine => new Date(semaine.start).toLocaleDateString('fr-FR', { month: 'long' }) === month);
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    },
    redirectToContact(item) {
      this.$store.commit('setStartDate', item.start);
      this.$store.commit('setEndDate', item.end);
      this.$router.push('/contact');
    },
  },
};
</script>

<style scoped>
th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
th {
  background-color: #f2f2f2;
}
.disponible {
  color: green;
}
.non-disponible {
  color: red;
}
</style>
