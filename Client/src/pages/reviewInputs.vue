<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Zufällige Daten generieren
const getRandomName = () => {
  const names = ['Max', 'Anna', 'Peter', 'Laura', 'Julia', 'Michael', 'Sophie'];
  return names[Math.floor(Math.random() * names.length)];
};

const getRandomLastName = () => {
  const lastNames = [
    'Müller',
    'Schmidt',
    'Meier',
    'Schulz',
    'Schneider',
    'Fischer',
    'Weber',
  ];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
};

const getRandomCompany = () => {
  const companies = [
    'Tech Innovations GmbH',
    'Global Solutions AG',
    'Creative Minds Inc.',
    'Green Energy Corp.',
    'Future Technologies Ltd.',
  ];
  return companies[Math.floor(Math.random() * companies.length)];
};

const firstName = ref(getRandomName());
const lastName = ref(getRandomLastName());
const companyName = ref(getRandomCompany());
const purpose = ref(
  'Besuch zur Besprechung von Projektideen und Kooperationen.',
);
const contactPerson = ref('Herr/Frau Beispiel');

const ctx = ref(null);
const isDrawing = ref(false);
const isModalOpen = ref(false);
const imageURL = ref('');
const canvasRef = ref(null);

// Router-Methoden
const registerUser = () => {
  alert('Angemeldet!');
  // Hier kann eine tatsächliche Registrierungsmethode implementiert werden
};

const goBack = () => {
  router.push('/inputBasicData'); // Hier die richtige vorherige Seite angeben
};

// Funktionen zur Verwaltung der Unterschrift
const startDrawing = (event) => {
  isDrawing.value = true;
  ctx.value.beginPath();
  ctx.value.moveTo(event.offsetX, event.offsetY);
};

const stopDrawing = () => {
  isDrawing.value = false;
};

const draw = (event) => {
  if (!isDrawing.value) return;
  ctx.value.lineTo(event.offsetX, event.offsetY);
  ctx.value.stroke();
};

const clearCanvas = () => {
  const canvas = canvasRef.value;
  ctx.value.clearRect(0, 0, canvas.width, canvas.height);
  updateImagePreview();
};

const updateImagePreview = () => {
  const canvas = canvasRef.value;
  imageURL.value = canvas.toDataURL('image/png');
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const setBlankCanvas = () => {
  const canvas = canvasRef.value;
  ctx.value.fillStyle = '#d3d3d3';
  ctx.value.fillRect(0, 0, canvas.width, canvas.height);
};

onMounted(() => {
  ctx.value = canvasRef.value.getContext('2d');
  setBlankCanvas();
  updateImagePreview();

  canvasRef.value.addEventListener('mousedown', startDrawing);
  canvasRef.value.addEventListener('mouseup', stopDrawing);
  canvasRef.value.addEventListener('mousemove', draw);
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Anmeldeformular
      </h2>

      <form class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="vorname" class="block text-sm font-medium text-gray-700"
              >Vorname</label
            >
            <input
              type="text"
              id="vorname"
              v-model="firstName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Gib deinen Vornamen ein"
              readonly
            />
          </div>

          <div>
            <label
              for="nachname"
              class="block text-sm font-medium text-gray-700"
              >Nachname</label
            >
            <input
              type="text"
              id="nachname"
              v-model="lastName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Gib deinen Nachnamen ein"
              readonly
            />
          </div>
        </div>

        <div>
          <label
            for="companyName"
            class="block text-sm font-medium text-gray-700"
            >Firmenname</label
          >
          <input
            type="text"
            id="companyName"
            v-model="companyName"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Gib deinen Firmennamen ein"
            readonly
          />
        </div>

        <div>
          <label for="purpose" class="block text-sm font-medium text-gray-700"
            >Zweck</label
          >
          <textarea
            id="purpose"
            rows="5"
            v-model="purpose"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Gib den Zweck deines Besuchs ein"
            readonly
          ></textarea>
        </div>

        <div>
          <label
            for="contactPerson"
            class="block text-sm font-medium text-gray-700"
            >Kontaktperson (optional)</label
          >
          <input
            type="text"
            id="contactPerson"
            v-model="contactPerson"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Gib den Namen deiner Kontaktperson ein (falls vorhanden)"
            readonly
          />
        </div>

        <div class="mt-10">
          <img
            src="../../public/images/unterschriftbeispiel.png"
            :src="imageURL"
            alt="unterschriftFeld"
            class="w-64 h-auto cursor-pointer border border-gray-300 bg-light-blue"
            @click="openModal"
            style="background-color: lightblue"
          />

          <div
            id="static-modal"
            tabindex="-1"
            aria-hidden="true"
            :class="{ hidden: !isModalOpen }"
            class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class="relative p-4 w-full max-w-2xl max-h-full">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div
                  class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
                >
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    @click="closeModal"
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Modal schließen</span>
                  </button>
                </div>
                <div class="p-4 md:p-5 space-y-4">
                  <div>
                    <h1>Bitte unterschreiben!</h1>
                    <canvas
                      ref="canvasRef"
                      width="400"
                      height="100"
                      style="border: 1px solid black"
                    ></canvas>
                    <br />
                    <button @click="clearCanvas">Zeichenfläche leeren</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-8 flex justify-between space-x-4">
          <button
            type="button"
            @click="registerUser"
            class="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out text-lg font-semibold"
          >
            Anmelden
          </button>
          <button
            type="button"
            @click="goBack"
            class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out text-lg font-semibold"
          >
            Zurück
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
</style>
