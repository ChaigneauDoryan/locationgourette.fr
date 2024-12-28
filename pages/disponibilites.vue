<template>
  <!-- Disponibilités -->
  <v-card elevation="10" class="disponibilite">
    <v-card-item class="pa-0">
      <div class="d-sm-flex align-center justify-space-between">
        <h5 class="text-h5 mb-0 pl-7 pt-7">
          <v-icon>mdi-tag</v-icon>&nbsp;&nbsp;&nbsp;
          <u>Disponibilités</u>
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
  name: 'Disponibilites',
  data() {
    return {
      semaines: [
        { start: '2025-01-04', end: '2025-01-11', disponible: false },
        { start: '2025-01-11', end: '2025-01-18', disponible: false },
        { start: '2025-01-18', end: '2025-01-25', disponible: false },
        { start: '2025-01-25', end: '2025-02-01', disponible: false },
        { start: '2025-02-01', end: '2025-02-08', disponible: false },
        { start: '2025-02-08', end: '2025-02-15', disponible: false },
        { start: '2025-02-15', end: '2025-02-22', disponible: false },
        { start: '2025-02-22', end: '2025-03-01', disponible: false },
        { start: '2025-03-01', end: '2025-03-08', disponible: false },
        { start: '2025-03-08', end: '2025-03-15', disponible: false },
        { start: '2025-03-15', end: '2025-03-22', disponible: false },
        { start: '2025-03-22', end: '2025-03-29', disponible: false },
        { start: '2025-03-29', end: '2025-04-05', disponible: false },
        { start: '2025-04-05', end: '2025-04-12', disponible: true },
        { start: '2025-04-12', end: '2025-04-19', disponible: true },
        { start: '2025-04-19', end: '2025-04-26', disponible: true },
        { start: '2025-04-26', end: '2025-05-03', disponible: true },
        { start: '2025-05-03', end: '2025-05-10', disponible: true },
        { start: '2025-05-10', end: '2025-05-17', disponible: true },
        { start: '2025-05-17', end: '2025-05-24', disponible: true },
        { start: '2025-05-24', end: '2025-05-31', disponible: true },
        { start: '2025-05-31', end: '2025-06-07', disponible: true },
        { start: '2025-06-07', end: '2025-06-14', disponible: true },
        { start: '2025-06-14', end: '2025-06-21', disponible: true },
        { start: '2025-06-21', end: '2025-06-28', disponible: true },
        { start: '2025-06-28', end: '2025-07-05', disponible: true },
        { start: '2025-07-05', end: '2025-07-12', disponible: true },
        { start: '2025-07-12', end: '2025-07-19', disponible: true },
        { start: '2025-07-19', end: '2025-07-26', disponible: true },
        { start: '2025-07-26', end: '2025-08-02', disponible: true },
        { start: '2025-08-02', end: '2025-08-09', disponible: true },
        { start: '2025-08-09', end: '2025-08-16', disponible: true },
        { start: '2025-08-16', end: '2025-08-23', disponible: true },
        { start: '2025-08-23', end: '2025-08-30', disponible: true }
      ],
      search: '',
      headers: [
        { text: 'Semaine', value: 'start', align: 'left', clearable: true, sortable: false },
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
