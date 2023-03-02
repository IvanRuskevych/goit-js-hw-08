// # 1. Відстежуй на формі подію input, і щоразу записуй у локальне сховище
//      об'єкт з полями email і message, у яких зберігай поточні значення полів форми.
//      Нехай ключем для сховища буде рядок "feedback-form-state".
// # 2. Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані,
//      заповнюй ними поля форми.
//      В іншому випадку поля повинні бути порожніми.
// # 3. Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль
//      об'єкт з полями email, message та їхніми поточними значеннями.
// # 4. Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд.
//      Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import { save, load } from '../js/local_storage';
import Throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
// console.log('formRef:', formRef);
const emailRef = document.querySelector('[name="email"]');
// console.log('emailRef:', emailRef);
const messageRef = document.querySelector('[name="message"]');
// console.log('messageRef:', messageRef);

const LOCALSTORAGE_KEY = 'feedback-form-state';
let feedbackData = {
  email: '',
  message: '',
};

formRef.addEventListener('input', Throttle(updateFeedbackData, 500));

function updateFeedbackData(e) {
  feedbackData[e.target.name] = e.target.value;
  save(LOCALSTORAGE_KEY, feedbackData);
  //   console.log(e.target.name, ':', e.target.value);
}

if (load(LOCALSTORAGE_KEY) !== undefined) {
  feedbackData = load(LOCALSTORAGE_KEY);
  //   console.log('feedbackData:', feedbackData);
  emailRef.value = feedbackData.email;
  messageRef.value = feedbackData.message;
}

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  console.log(localStorage[LOCALSTORAGE_KEY]);
  formRef.reset();
  localStorage.clear();
}
