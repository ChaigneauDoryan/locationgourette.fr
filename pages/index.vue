<template>
  <div>
    <!--  Description de l'annonce-->
    <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="10" class="index">
        <v-card-item class="pa-0">
          <div class="d-sm-flex align-center justify-space-between">
            <h5 class="text-h5 mb-0 pl-7 pt-7">
              <v-icon>mdi-information</v-icon>&nbsp;&nbsp;&nbsp;
              <u>DESCRIPTION DE L'ANNONCE</u>
            </h5>
            <slot name="action"></slot>
          </div>
          <v-card-text>
            <h4>Situation :</h4>
            <p style="margin-top: 10px;text-align: justify;">
              <span style="margin-left: 20px;">
                <v-icon>mdi-domain</v-icon>&nbsp;&nbsp;&nbsp;Appartement de 30M² entièrement rénové, balcon exposé sud avec vue sur les sommets.
              </span>
            </p>
            <p style="margin-top: 5px;text-align: justify;">
              <span style="margin-left: 20px;">
                <v-icon>mdi-map-marker</v-icon>&nbsp;&nbsp;&nbsp;Situé au cœur de la station au 4ème étage de la résidence Sanctus. Plateforme le valentin.
              </span>
            </p>
            <p style="margin-top: 5px;text-align: justify;">
              <span style="margin-left: 20px;">
                <v-icon>mdi-account</v-icon>&nbsp;&nbsp;&nbsp;Résidence avec concierge, 2 entrées avec badges et étages desservis par 2 ascenseurs.</span>
            </p>
            <br>
            <h4>Cuisine intégrée entièrement neuve :</h4>
            <p style="margin-top: 10px;text-align: justify;">
              <span style="margin-left: 20px;">
                <v-icon>mdi-silverware-fork-knife</v-icon>&nbsp;&nbsp;&nbsp;Lave-vaisselle, grand réfrigérateur, plaque induction, combiné four + micro ondes, cafetière, service raclette, grille-pain, aspirateur.</span>
            </p>
            <br>
            <h4>Pièce de vie : </h4>
            <p style="margin-top: 10px;text-align: justify;">
              <span style="margin-left: 20px;">
                <v-icon>mdi-home</v-icon>&nbsp;&nbsp;&nbsp;Spacieuse pour un studio, canapé/lit 140cm (sommier à lattes et matelas bultex), canapé/lit neuf BZ 1 personne, placard, TV 80cm, balcon</span>
            </p>
            <br>
            <h4>Alcoves : </h4>
            <p style="margin-top: 10px;text-align: justify;">
              <span style="margin-left: 20px;">
                <v-icon>mdi-bed-queen</v-icon>&nbsp;&nbsp;&nbsp;1 lit superposé 2 + 1 (140cm en bas / 90 cm en haut), possibilité de fermer la porte du couloir afin de séparer les deux espaces.</span>
            </p>
            <br>
            <h4>Salle de bain rénovée : </h4>
            <p style="margin-top: 10px;text-align: justify;">
              <span style="margin-left: 20px;">
                <v-icon>mdi-shower-head</v-icon>&nbsp;&nbsp;&nbsp;Douche avec paroi de douche vitrée<br>
              </span>
            </p>
            <p style="margin-top: 5px;text-align: justify;">
              <span style="margin-left: 20px;">
                <v-icon>mdi-toilet</v-icon>&nbsp;&nbsp;&nbsp;WC séparés
              </span>
            </p>
            <br>
            <h4>Information complémentaire : </h4>
            <p style="margin-top: 5px;text-align: justify;">
              <span style="margin-left: 20px;">
                <v-icon>mdi-parking</v-icon>&nbsp;&nbsp;&nbsp;Parking gratuit</span>
            </p>
          </v-card-text>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>

    <!-- Heure d'arrivée / départ -->
    <v-row>
      <v-col cols="12" md="12">
        <v-card elevation="10" class="index">
          <v-card-item class="pa-0">
            <div class="d-sm-flex align-center justify-space-between">
              <h5 class="text-h5 mb-0 pl-7 pt-7">
                <v-icon>mdi-clock</v-icon>&nbsp;&nbsp;&nbsp;
                <u>HEURE D'ARRIVÉE / DÉPART</u>
              </h5>
              <slot name="action"></slot>
            </div>
            <slot />
            <v-card-text>
              <p style="text-align: justify;margin-top: 0px;">
              <span style="margin-left: 20px;">
                Chers clients, nous souhaitons vous informer que l’heure d'arrivée est fixée à partir de 12h00 jusqu'à 18h00 et l’heure de départ avant 10h00. Si vous prévoyez arriver plus tôt ou de partir plus tard, veuillez nous en informer à l'avance pour que nous puissions organiser une solution alternative si possible. Nous apprécions votre coopération pour assurer une expérience agréable pour tous nos clients.
              </span>
              </p>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <!-- Remise des clés -->
    <v-row>
      <v-col cols="12" md="12">
        <v-card elevation="10" class="index">
          <v-card-item class="pa-0">
            <div class="d-sm-flex align-center justify-space-between">
              <h5 class="text-h5 mb-0 pl-7 pt-7">
                <v-icon>mdi-key</v-icon>&nbsp;&nbsp;&nbsp;
                <u>REMISE DES CLES</u>
              </h5>
              <slot name="action"></slot>
            </div>
            <slot />
            <v-card-text>
              <p style="text-align: justify;margin-top: 0px;">
              <span style="margin-left: 20px;">
                Pour la remise des clés, c'est une remise en main propre avec le concierge.
              </span>
              </p>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <!--  Photos-->
    <v-row>
      <v-col cols="12" md="12">
        <v-card elevation="10" class="index">
          <v-card-item class="pa-0">
            <div class="d-sm-flex align-center justify-space-between">
              <h5 class="text-h5 mb-6 pl-7 pt-7">
                <v-icon>mdi-camera</v-icon>&nbsp;&nbsp;&nbsp;
                <u>PHOTOS</u>
              </h5>
              <slot name="action"></slot>
            </div>
            <slot />
            <div class="carousel-container">
              <v-carousel
                cycle
                :interval="3000"
                class="carousel"
                show-arrows="hover"
                :height="carouselHeight"
              >
                <v-carousel-item v-for="(image, index) in images" :key="index">
                  <v-sheet height="100%">
                    <v-img
                      :src="image.url"
                      :alt="image.alt"
                      class="carousel-image"
                      contain
                    ></v-img>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </div>
            <br>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <!-- Inventaire -->
    <v-row>
      <v-col cols="12" md="12">
        <v-card elevation="10" class="index">
          <v-card-item class="pa-0">
            <div class="d-sm-flex align-center justify-space-between">
              <h5 class="text-h5 mb-0 pl-7 pt-7">
                <v-icon>mdi-format-list-bulleted</v-icon>&nbsp;&nbsp;&nbsp;
                <u>INVENTAIRE</u>
              </h5>
              <slot name="action"></slot>
            </div>
            <slot />
            <v-card-text>
              <p style="text-align: justify;">
              <span style="margin-left: 20px;">&nbsp;&nbsp;&nbsp;
                L'inventaire repose sur la confiance. Si vous constatez à votre arrivée une anomalie ou un dysfonctionnement d'un équipement, nous vous prions de nous en informer dès que possible. L'objectif n'est pas de compter chaque couteau, fourchette…mais de vérifier si rien d'important ne manque.
              </span>
              </p>
              <br>
              <br>
              <v-row style="text-align: center">
                <v-col>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 3 Poëles</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 2 Casseroles</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Egoutoir</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Faitout</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Presse purée</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Couvercle</p>
                </v-col>
                <v-col>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; Plusieurs plats au four</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Lot de couvert</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Tire bouchon</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Couteau à pain</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Grand couteau</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Couteau d'office</p>
                </v-col>
                <v-col>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Ouvre boîte</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Décapsuleur</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Econome</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Ciseau</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Fouet</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Ecumoir</p>
                </v-col>
                <v-col>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Louche</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Grille pain</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Cafetière</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Micro-onde combiné</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Service à raclette</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; 1 Fer à repasser</p>
                </v-col>
                <v-col>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; Plusieurs assiettes</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; Plusieurs verres</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; Plusieurs bols</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; Plusieurs tasses</p>
                  <p style="text-align: left"><input type="checkbox" value="1">&nbsp; Jeux de société</p>
                </v-col>
              </v-row>
              <br>
              <br>
              <p style="text-align: justify;">
              <span style="margin-left: 20px;">&nbsp;&nbsp;&nbsp;
                Concernant le couchage, vous trouverez 4 couettes (1 pour lit double et 3 pour lit individuel), 5 oreillers ainsi que 2 couvertures.
              </span>
              </p>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <!--  Règlement intérieur-->
    <v-row>
      <v-col cols="12" md="12">
        <v-card elevation="10" class="index">
          <v-card-item class="pa-0">
            <div class="d-sm-flex align-center justify-space-between">
              <h5 class="text-h5 mb-0 pl-7 pt-7">
                <v-icon>mdi-file</v-icon>&nbsp;&nbsp;&nbsp;
                <u>RÈGLEMENT INTÉRIEUR</u>
              </h5>
              <slot name="action"></slot>
            </div>
            <slot />
            <v-card-text>
              <h4>
                <v-icon>mdi-dog</v-icon>
                Animaux :
              </h4>
              <p style="margin-top: 10px;text-align: justify;">
                <span style="margin-left: 20px;">&nbsp;&nbsp;&nbsp;Animaux non acceptés afin d’éviter toute nuisance sonore</span>
              </p>
              <br>
              <h4>
                <v-icon>mdi-smoking-off</v-icon>
                Pensez aux prochains voyageurs :
              </h4>
              <p style="margin-top: 10px;text-align: justify;">
              <span style="margin-left: 20px;">&nbsp;&nbsp;&nbsp;
                Il est strictement interdit de fumer dans ce logement. Nous vous demandons de penser aux prochains voyageurs qui souhaitent arriver dans un environnement sans odeur de tabac froid. Il est cependant autorisé de fumer sur le balcon de ce logement. Nous vous prions de bien vouloir refermer la porte-fenêtre pour éviter que la fumée ne pénètre à l'intérieur de l'appartement. Merci de respecter cette règle pour le confort de tous les voyageurs.
              </span>
              </p>
              <br>
              <h4>
                <v-icon>mdi-glass-mug-off</v-icon>
                En cas de casse :
              </h4>
              <p style="margin-top: 10px;text-align: justify;">
              <span style="margin-left: 20px;">&nbsp;&nbsp;&nbsp;
                Dans le cas où vous casseriez quelque chose, nous vous prions de nous en informer immédiatement, afin que je prévois d'en rapporter lors de notre prochaine venue que ce soit pour une casse mineure due à l'usure d'un équipement ou pour un problème plus important. Il n'y aura pas de retenue sur la caution pour vaisselle cassée sauf si quantité importante.
              </span>
              </p>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import balcon from '@/assets/images/appartement/Balcon.jpg';
import alcove from '@/assets/images/appartement/alcove.jpg';
import alcove2 from '@/assets/images/appartement/alcove2.jpg';
import vueEte from '@/assets/images/appartement/vueEte.jpg';
import vueHiverBis from '@/assets/images/appartement/vueHiverBis.jpg';
import vueInterieureBis from '@/assets/images/appartement/vueInterieureBis.jpg';
import vueInterieurePano from '@/assets/images/appartement/vueInterieurePano.jpg';
import wc from '@/assets/images/appartement/wc.jpg';
import sdb from '@/assets/images/appartement/sdb.jpg';

export default {
  name: 'IndexPage',
  head() {
    return {
      title: 'Gourette - Location Appartement',
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: "Location d'un appartement de 35m² au pied des pistes à Gourette. Il est situé sur la plateforme du Valentin avec une superbe vue sur les pistes."
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'author', content: 'Stéphane Chaigneau' },
        {
          name: "keywords",
          content: 'location gourette, location Gourette, Location gourette, Location Gourette, Location appartement gourette, Location appartement Gourette, location appartement Gourette, appartement gourette, appartement Gourette, Appartement Gourette'
        },
        { property: "og:title", content: "Gourette - Location Appartement" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://locationgourette.fr/" },
        { property: "og:site_name", content: "Gourette - Location Appartement" },
        {
          property: "og:description",
          content: "Location d'un appartement de 35m² au pied des pistes à Gourette. Il est situé sur la plateforme du Valentin avec une superbe vue pistes."
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
      carouselHeight: 500,
      images: [
        { url: vueInterieureBis, alt: 'vueInterieureBis' },
        { url: vueInterieurePano, alt: 'vueInterieurePano' },
        { url: alcove, alt: 'alcove' },
        { url: alcove2, alt: 'alcove2' },
        { url: vueHiverBis, alt: 'vueHiverBis' },
        { url: vueEte, alt: 'vueEte' },
        { url: sdb, alt: 'sdb' },
        { url: wc, alt: 'wc' },
        { url: balcon, alt: 'balcon' }
      ]
    }
  }
}
</script>


<style>
.index {
  max-width: 1500px;
  margin: 0 auto;
}
.carousel-container {
  height: 500px;
}
.carousel-image {
  width: 100%;
  height: 100%;
}
</style>
