<script setup>
import { ref, computed } from 'vue';
let searchval = ref('');
let active = [
  {
    value: '156',
  },
  {
    value: '186',
  },
  {
    value: '124',
  },
  {
    value: '521',
  },
  {
    value: '102',
  },
];

let filteractive = computed(() => {
  let filtered = [];
  if (searchval.value == '') {
    return filtered;
  }
  for (const item of active) {
    console.log(item.value);
    if (item.value.startsWith(searchval.value)) {
      console.log('hallo');
      filtered.push(item);
    }
  }
  return filtered;
});

function logout(id) {
  // Communication to Database to logout the selected User (by ID)
}
</script>

<template>
  <div>
    <div class="p-2 text-center">
      <input
        type="text"
        v-model.trim="searchval"
        placeholder="Zahl hier eingeben..."
        class="w-1/2 rounded-lg border border-gray-300"
      />
    </div>

    <div class="text-center" v-if="filteractive.length == 0">
      <p>Keine Aktiven Accounts zu "{{ searchval }}" gefunden.</p>
    </div>

    <div v-else>
      <div
        v-for="a in filteractive"
        :key="a.value"
        class="flex justify-center items-center space-x-4 my-2"
      >
        <div class="valdiv ml-10">{{ a.value }}</div>
        <button class="valbutton bg-blue-500 text-white px-4 py-2 rounded-lg" @click="logout(a.id)">
          Abmelden
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
