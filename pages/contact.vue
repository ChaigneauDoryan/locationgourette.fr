<script>
import emailjs from 'emailjs-com';

export default {
  name: 'contact',
  data() {
    return  {
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        value => {
          if (value) return true

          return 'Le champ est obligatoire.'
        },
        value => {
          if (value?.length <= 20) return true

          return 'Le champ doit contenir moins de 20 caractères.'
        },
      ],
      email: '',
      emailRules: [
        value => {
          if (value) return true

          return 'L\'e-mail est obligatoire.'
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true

          return 'L\'e-mail doit être valide.'
        },
      ],
      object: '',
      objectRules: [
        value => {
          if (value) return true

          return 'L\'objet est obligatoire.'
        }
      ],
      message: '',
      messageRules: [
        value => {
          if (value) return true

          return 'Le champ est obligatoire.'
        }
      ],
      startDate: null,
      endDate: null,
    }
  },
  created() {
    this.initializeFields();
  },
  methods:{
    initializeFields() {
      this.firstname = '';
      this.lastname = '';
      this.email = '';
      this.object = '';
      this.message = '';
    },
    sendEmail() {
      try {
        // Envoie du mail
        emailjs.send('serviceGmail','templateContact',{
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          object: this.object,
          message: this.message,
          dateDebut: this.startDate,
          dateFin: this.endDate
        },'yrBFeRoluzxG6JG2m'); //XW_jKn2feX3p2OPzM
        alert("Message envoyé.")

        // Rechargement de la page
        location.reload();
      } catch (error) {
        console.log(error)
        alert("Une erreur s'est produite, veuillez réessayer !")
      }
    },
    convertToUpperCase() {
      this.lastname = this.lastname.toUpperCase();
    },
  },
  computed: {
    dateRules() {
      const rules = [];
      if (this.startDate) {
        rules.push((value) => {
          const isEndDateValid = value > this.startDate;
          return isEndDateValid || 'La date de fin doit être supérieure à la date de début.';
        });
      }
      return rules;
    }
  },
}

</script>

<template>

  <!-- Formulaire de contact -->
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="10" class="contact">
        <v-card-item class="pa-0">
          <div class="d-sm-flex align-center justify-space-between">
            <h5 class="text-h5 mb-6 pl-7 pt-7">
              <v-icon>mdi-devices</v-icon>&nbsp;&nbsp;&nbsp;
              <u>PAGE DE CONTACT</u> &nbsp; (Stéphane CHAIGNEAU : <a href="tel:0674814090" > 06 74 81 40 90</a>)
            </h5>
            <slot name="action"></slot>
          </div>
          <slot />
          <v-row>
            <v-col cols="12" md="12">
              <v-form v-model="valid" @submit.prevent="sendEmail" ref="form">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field v-model="firstname" :counter="20" :rules="nameRules" label="Prénom"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field v-model="lastname" :counter="20" :rules="nameRules" label="Nom" @input="convertToUpperCase" required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field v-model="email" label="E-mail" :rules="emailRules" required></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="1">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="startDate"
                            label="Date d'arrivée"
                            readonly
                            v-on="on"
                            open-on-clear
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="startDate"
                          @input="menu = false"
                          locale="fr"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" md="1">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="endDate"
                            label="Date de départ"
                            readonly
                            v-on="on"
                            :rules="dateRules"
                            open-on-clear
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="endDate"
                          @input="menu = false"
                          :min="startDate"
                          locale="fr"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" md="10">
                      <v-text-field v-model="object" label="Objet" :rules="objectRules" required></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="12">
                      <v-textarea v-model="message" label="Message" aria-required="true" :rules="messageRules"></v-textarea>
                    </v-col>
                  </v-row>

                  <v-btn type="submit" block class="mt-2" color="primary" :disabled="!valid">Envoyer</v-btn>

                </v-container>
              </v-form>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<style>
.contact {
  max-width: 1500px;
  margin: 0 auto;
}
</style>
