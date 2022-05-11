import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const operators = {
  sum: (initialValue, secondValue) => initialValue + secondValue,
  subtract: (initialValue, secondValue) => initialValue - secondValue,
  multiply: (initialValue, secondValue) => initialValue * secondValue,
  divide: (initialValue, secondValue) => initialValue / secondValue,
};

// Создайте Vue приложение
const App = defineComponent({
  name: 'app',

  data() {
    return {
      firstOperand: 0,
      secondOperand: 0,
      typeOfCalculation: 'sum',
    };
  },

  computed: {
    calculationResult() {
      return operators[this.typeOfCalculation](this.firstOperand, this.secondOperand);
    },
  },
});

createApp(App).mount('#app');
