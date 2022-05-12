import { defineComponent } from './vendor/vue.esm-browser.js';
import { fetchMeetupById } from './meetupService.js';

import MeetupView from '../../02-components/06-MeetupView/MeetupView.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      status: '',
      meetup: null,
      errorMessage: '',
    };
  },

  watch: {
    meetupId: {
      async handler() {
        try {
          this.status = 'loading';
          this.meetup = await fetchMeetupById(this.meetupId);
          this.status = 'ok';
          this.errorMessage = '';
        } catch (e) {
          this.status = 'error';
          this.meetup = null;
          this.errorMessage = e.message;
        }
      },
      immediate: true,
    },
  },

  template: `
    <div class="page-meetup">

    <MeetupView v-if="this.meetup && this.status !== 'loading'" :meetup="this.meetup"  />

      <ui-container v-if="this.status === 'loading'">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="this.status === 'error'">
        <ui-alert>{{ this.errorMessage }}</ui-alert>
      </ui-container>
    </div>`,
});
