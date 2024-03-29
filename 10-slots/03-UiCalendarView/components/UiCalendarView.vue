<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" aria-label="Previous month" @click="previousMonth" />
        <div class="calendar-view__date">{{ calendarHeader.month }} {{ calendarHeader.year }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="nextMonth" />
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        v-for="day in currentMonthDays"
        :key="day.dateToString"
        class="calendar-view__cell"
        tabindex="0"
        :class="{ 'calendar-view__cell_inactive': day.currentMonth === false }"
      >
        <div class="calendar-view__cell-day">{{ day.currentDate }}</div>
        <div class="calendar-view__cell-content">
          <slot :day="day" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  data() {
    return {
      currentDate: new Date(),
    };
  },

  computed: {
    calendarHeader() {
      return {
        month: this.currentDate.toLocaleString(navigator.language, {
          month: 'long',
        }),
        year: this.currentDate.getFullYear(),
      };
    },

    currentMonthDays() {
      let currentMonth = [];
      let firstDay = new Date(this.currentDate.setDate(1));

      let dayOfWeek = new Date(firstDay).setDate(new Date(firstDay).getDate() - (new Date(firstDay).getDay() || 7) + 1);

      for (let i = 0; i < 42; i++) {
        let currentDate = new Date(this.currentDate);
        let currentDay = new Date(dayOfWeek).setDate(new Date(dayOfWeek).getDate() + i);

        let matchingFirstDay =
          new Date(currentDate.setMonth(currentDate.getMonth() + 1)).getMonth() === new Date(currentDay).getMonth() &&
          new Date(currentDay).getDay() === 1;
        let matchingLastDay =
          new Date(currentDay).getMonth() === new Date(currentDate.setMonth(currentDate.getMonth() + 1)).getMonth() &&
          new Date(currentDay).getDay() === 0;

        if (matchingFirstDay) break;
        if (matchingLastDay) break;

        currentMonth.push({
          currentDate: new Date(currentDay).getDate(),
          currentMonth: new Date(this.currentDate).getMonth() === new Date(currentDay).getMonth(),
          dateToString: new Date(currentDay).toDateString(),
        });
      }
      return currentMonth;
    },
  },

  methods: {
    nextMonth() {
      this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
    },
    previousMonth() {
      this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
    },
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
