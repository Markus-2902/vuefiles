<script>
export default {
  data() {
    return {
      ctx: null,
      isDrawing: false,
      isModalOpen: false,
      imageURL: '',
    };
  },
  mounted() {
    const canvas = this.$refs.canvas;
    this.ctx = canvas.getContext('2d');

    // Ensure a blank canvas is drawn at the start
    this.setBlankCanvas();
    this.updateImagePreview();

    canvas.addEventListener('mousedown', this.startDrawing);
    canvas.addEventListener('mouseup', this.stopDrawing);
    canvas.addEventListener('mousemove', this.draw);
  },
  methods: {
    startDrawing(event) {
      this.isDrawing = true;
      this.ctx.beginPath();
      this.ctx.moveTo(event.offsetX, event.offsetY);
    },
    stopDrawing() {
      this.isDrawing = false;
      this.updateImagePreview();
    },
    draw(event) {
      if (!this.isDrawing) return;
      this.ctx.lineTo(event.offsetX, event.offsetY);
      this.ctx.stroke();
    },
    saveImage() {
      this.updateImagePreview();
      const link = document.createElement('a');
      link.href = this.imageURL;
      link.download = 'zeichnung.png';
      link.click();
    },
    clearCanvas() {
      const canvas = this.$refs.canvas;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.updateImagePreview();
    },
    updateImagePreview() {
      const canvas = this.$refs.canvas;
      this.imageURL = canvas.toDataURL('image/png');
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    setBlankCanvas() {
      const canvas = this.$refs.canvas;
      // Draw a blank canvas initially
      this.ctx.fillStyle = '#d3d3d3 '; // Set a white background
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
  },
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 py-10 px-4">
  <!-- Image that shows current drawing -->
  <img
    :src="imageURL"
    alt="unterschriftFeld"
    class="w-64 h-auto cursor-pointer border border-gray-300 bg-light-blue"
    @click="openModal"
    style="background-color: lightblue"
  />

  <!-- Main modal -->
  <div
    id="static-modal"
    data-modal-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
    :class="{ hidden: !isModalOpen }"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
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
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          <div>
            <h1>Bitte unterschreiben!</h1>
            <canvas ref="canvas" width="400" height="100" style="border: 1px solid black"></canvas>
            <br />
            <!-- <button @click="saveImage">Bild speichern</button> -->
            <button @click="clearCanvas">Zeichenfläche leeren</button>
          </div>
        </div>
        <!-- Modal footer -->
      </div>
    </div>
  </div>
</div>
</template>
