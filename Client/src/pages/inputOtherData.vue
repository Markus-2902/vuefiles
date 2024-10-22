<script setup>
const router = useRouter();

const Routerform = () => {
  router.push('/reviewInputs'); // Navigation zur nächsten Seite
};

// Daten und Zustand für das Formular
const purpose = ref('');
const contactPerson = ref('');
const isDsgvoConfirmed = ref(false);
const isSecurityBriefConfirmed = ref(false);

// Zustand für die Signatur
const ctx = ref(null);
const isDrawing = ref(false);
const isModalOpen = ref(false);
const imageURL = ref('');

// Ref für das Canvas
const canvasRef = ref(null);

// Funktionen zur Verwaltung der Unterschrift
const startDrawing = (event) => {
  isDrawing.value = true;
  ctx.value.beginPath();
  ctx.value.moveTo(event.offsetX, event.offsetY);
};

const stopDrawing = () => {
  isDrawing.value = false;
  updateImagePreview();
};

const draw = (event) => {
  if (!isDrawing.value) return;
  ctx.value.lineTo(event.offsetX, event.offsetY);
  ctx.value.stroke();
};

const saveImage = () => {
  updateImagePreview();
  const link = document.createElement('a');
  link.href = imageURL.value;
  link.download = 'zeichnung.png';
  link.click();
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

// Formular einreichen
const submitForm = () => {
  if (isDsgvoConfirmed.value && isSecurityBriefConfirmed.value) {
    alert('Bitte bestätige beide Bedingungen!');
  }
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
        Anmeldeformular: Schritt 2
      </h2>

      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Zweck -->
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
          ></textarea>
        </div>

        <!-- Kontaktperson (optional) -->
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
          />
        </div>

        <!-- Checkboxen für DSGVO und Sicherheitsunterweisung -->
        <div class="flex flex-col space-y-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="dsgvoConfirm"
              v-model="isDsgvoConfirmed"
              class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label for="dsgvoConfirm" class="ml-2 block text-sm text-gray-900">
              Ich bestätige die
              <a
                href="https://youtube.com"
                target="_blank"
                class="text-indigo-600 underline"
                >DSGVO-Bedingungen</a
              >
            </label>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              id="securityBriefConfirm"
              v-model="isSecurityBriefConfirmed"
              class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              for="securityBriefConfirm"
              class="ml-2 block text-sm text-gray-900"
            >
              Ich bestätige die
              <a
                href="https://youtube.com"
                target="_blank"
                class="text-indigo-600 underline"
                >Sicherheitsunterweisung</a
              >.
            </label>
          </div>
        </div>

        <!-- Unterschrift -->
        <div class="mt-10">
          <img
            :src="imageURL"
            alt="unterschriftFeld"
            class="w-64 h-auto cursor-pointer border border-gray-300"
            @click="openModal"
            style="background-color: #d3d3d3"
          />

          <!-- Hauptmodal -->
          <div
            id="static-modal"
            data-modal-backdrop="static"
            tabindex="-1"
            aria-hidden="true"
            :class="{ hidden: !isModalOpen }"
            class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class="relative p-4 w-full max-w-2xl max-h-full">
              <!-- Modal-Inhalt -->
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal-Header -->
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
                <!-- Modal-Body -->
                <div class="p-4 md:p-5 space-y-4">
                  <div>
                    <h1>Bitte unterschreiben!</h1>
                    <canvas
                      ref="canvasRef"
                      width="400"
                      height="100"
                      style="border: 1px solid black; background-color: #d3d3d3"
                    ></canvas>
                    <br />
                    <button @click="clearCanvas">Zeichenfläche leeren</button>
                  </div>
                </div>
                <!-- Modal-Footer -->
              </div>
            </div>
          </div>
        </div>

        <!-- Abschicken Button -->
        <div class="pt-8">
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
            @click="Routerform"
          >
            Abschicken
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
/* Fokusringe entfernen */
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
</style>
