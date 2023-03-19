import { defineComponent } from './vendor/vue.esm-browser.js';
// import dayjs from 'dayjs';
// import ru from 'dayjs/locale/ru';

export default defineComponent({
  name: 'MeetupInfo',

  props: {
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
  },

  computed: {
    formatAsLocalDate() {
      return new Date(this.date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    formatAsIsoDate() {
      return new Date(this.date).toISOString().split('T')[0];
    },
  },

  /*  computed: {
    formatAsLocalDate() {
      return dayjs(this.date).locale('ru').format('DD MMMM YYYY [г.]');
    },
    formatAsIsoDate() {
      return dayjs(this.date).format('YYYY-MM-DD');
    },
  },*/

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="formatAsIsoDate">{{ formatAsLocalDate }}
        </time>
      </li>
    </ul>`,
});
