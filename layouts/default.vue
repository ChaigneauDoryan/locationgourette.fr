<template>
  <v-app light class="bg">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <router-link to="/">
        <div class="header-image">
          <img src="@/assets/images/logo/Gourette.png" alt="Gourette">
        </div>
      </router-link>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-main class="main-bg">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
    </v-navigation-drawer>
    <v-footer
      :absolute="fixed"
      app
      class="footer"
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>&nbsp;-&nbsp;Stéphane Chaigneau&nbsp;-&nbsp;<a href="https://locationgourette.fr">locationgourette.fr</a>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-newspaper',
          title: 'Annonce',
          to: '/'
        },
        {
          icon: 'mdi-ski',
          title: 'Plan des pistes',
          to: '/piste'
        },
        {
          icon: 'mdi-contacts',
          title: 'Adresses utiles',
          to: '/adressesUtiles'
        },
        {
          icon: 'mdi-devices',
          title: 'Me contacter',
          to: '/contact'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Location studio au pied des pistes"
    }
  }
}
</script>

<style>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-bg {
  background-image: url('../assets/images/vueHiverBis.jpg');
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.header-image {
  text-align: center;
  margin-bottom: 16px;
  margin-top: 16px;
}

.header-image img {
  max-width: 100%;
  height: auto;
  cursor: pointer;
}
</style>
