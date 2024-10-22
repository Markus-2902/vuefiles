<script setup>

</script>

<template>
  <header>
    <q-tabs class="bg-black text-white">
      <q-route-tab to="/" label="Welcome" class="text-white"></q-route-tab>
      <q-route-tab
        to="/goodbye"
        label="Goodbye Page"
        class="text-white"
      ></q-route-tab>
      <q-route-tab
        to="/logout"
        label="Abmeldescreen"
        class="text-white"
      ></q-route-tab>
      <q-route-tab
        to="/inputBasicData"
        label="Eingabefelder"
        class="text-white"
      ></q-route-tab>
    </q-tabs>
  </header>

  <RouterView />
</template>

<style>
@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat/Montserrat-Regular.ttf') format('truetype');
}

* {
  font-family: 'Montserrat';
}

@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
