<script>
import QrcodeVue, { QrcodeCanvas, QrcodeSvg } from 'qrcode.vue';

export default {
  data() {
    return {
      value: 'https://markus-2902.github.io/vuefiles/',
      size: 300,
    };
  },
  components: {
    QrcodeVue,
    QrcodeCanvas,
    QrcodeSvg,
  },
};
</script>

<template>
  <div
    style="
      background-image: url('../../public/images/Background_Welcome.jpg'); /* Pfad zu deinem Bild */
      background-position: left bottom; /* Positioniert das Bild unten links */
      background-size: cover; /* Deckt den gesamten Container ab */
      background-repeat: no-repeat; /* Verhindert das Wiederholen des Bildes */
      min-height: 100vh; /* Optional: Setzt die Mindesthöhe auf die Bildschirmhöhe */
    "
    class="h-screen"
  >
    <div class="q-mx-xl column items-center text-white pg">
      <div class="col text-h3 pt-3">POI Guestbook</div>
      <div class="col text-h6">Willkommen in der Porsche Informatik</div>
      <div class="col mt-7">
        <button class="button bg-orange-300 rounded-lg px-6 text-black py-2">
          Anmelden
        </button>
      </div>
      <div class="col mt-4">
        <button class="button bg-orange-300 rounded-lg text-black px-6 py-2">
          Als Gast fortführen
        </button>
      </div>
      <div class="col mt-4">
        <button class="button bg-orange-300 rounded-lg text-black px-6 py-2">
          Abmelden
        </button>
      </div>
      <div class="col mt-10">
        <qrcode-svg :value="value" level="H" />
      </div>
    </div>
  </div>
</template>

<style></style>
