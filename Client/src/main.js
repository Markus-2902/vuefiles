import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { Quasar, Notify } from 'quasar';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from './router';

const app = createApp(App);



app.use(createPinia());
app.use(router);
app.use(Quasar, {
  plugins: { Notify },
});

app.mount('#app');
