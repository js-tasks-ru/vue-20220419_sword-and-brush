import { defineComponent } from './vendor/vue.esm-browser.js';

import MeetupDescription from '../../02-components/02-MeetupDescription/MeetupDescription';
import MeetupCover from '../../02-components/03-MeetupCover/MeetupCover';
import MeetupInfo from '../../02-components/04-MeetupInfo/MeetupInfo';
import MeetupAgenda from '../../02-components/05-MeetupAgenda/MeetupAgenda';
import MeetupAgendaItem from '../../02-components/05-MeetupAgenda/MeetupAgenda';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgenda,
    MeetupAgendaItem,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <MeetupCover :title="meetup.title" :image="meetup.image" />
      <ui-container>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description="meetup.description" />
            <h3>Программа</h3>
            <MeetupAgenda v-if="meetup.agenda.length" :agenda="meetup.agenda" />
            <ui-alert v-else>Программа пока пуста...</ui-alert>
          </div>
          <div class="meetup__aside">
            <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
          </div>
        </div>
      </ui-container>
    </div>`,
});
