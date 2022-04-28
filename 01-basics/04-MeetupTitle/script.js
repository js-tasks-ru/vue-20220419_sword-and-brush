import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const App = defineComponent({
  name: 'app',

  data() {
    return {
      selectedMeetup: 1,
      meetupTitle: '',
    };
  },

  watch: {
    selectedMeetup: {
      async handler(meetupId) {
        this.meetupTitle = await fetchMeetupById(meetupId).then((res) => res.title);
      },
      immediate: true,
    },
  },
});

createApp(App).mount('#app');
