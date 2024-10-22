<script setup>
const isFromCompany = ref(false);
const companyName = ref('');

const router = useRouter();

const Routerform = () => {
  // Deine Formularvalidierung oder Logik
  router.push('/inputOtherData'); // Navigation zur nächsten Seite
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Anmeldeformular</h2>

      <form action="#" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="vorname" class="block text-sm font-medium text-gray-700">Vorname</label>
            <input
              type="text"
              id="vorname"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Gib deinen Vornamen ein"
            />
          </div>

          <div>
            <label for="nachname" class="block text-sm font-medium text-gray-700">Nachname</label>
            <input
              type="text"
              id="nachname"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Gib deinen Nachnamen ein"
            />
          </div>
        </div>

        <div>
          <label for="userType" class="block text-sm font-medium text-gray-700"
            >Kommst du von einer Firma oder bist du extern?</label
          >
          <select
            id="userType"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            v-model="isFromCompany"
          >
            <option :value="false">Extern</option>
            <option :value="true">Firma</option>
          </select>
        </div>

        <div v-if="isFromCompany" class="transition-opacity duration-300 ease-in-out">
          <label for="companyName" class="block text-sm font-medium text-gray-700"
            >Firmenname</label
          >
          <input
            type="text"
            id="companyName"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Gib deinen Firmennamen ein"
            v-model="companyName"
          />
        </div>

        <div class="pt-4">
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
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
</style>
