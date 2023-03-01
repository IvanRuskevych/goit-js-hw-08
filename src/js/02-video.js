// Ознайомся з документацією (https://github.com/vimeo/player.js/#vimeo-player-api) бібліотеки Vimeo плеєра.
// # 1. Додай бібліотеку як залежність проекту через npm.
// # 2. Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player
//      (https://github.com/vimeo/player.js/#pre-existing-player),
//      але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN.
// # 3. Вивчи документацію методу on()
//      (https://github.com/vimeo/player.js/#onevent-string-callback-function-void)
//      і почни відстежувати подію timeupdate - оновлення часу відтворення
//      (https://github.com/vimeo/player.js/#onevent-string-callback-function-void).
// # 4. Зберігай час відтворення у локальне сховище.
//      Нехай ключем для сховища буде рядок "videoplayer-current-time".
// # 5. Під час перезавантаження сторінки скористайся методом setCurrentTime()
//      (https://github.com/vimeo/player.js/#setcurrenttimeseconds-number-promisenumber-rangeerrorerror)
//      з метою відновлення відтворення зі збереженої позиції.
// # 6. Додай до проекту бібліотеку lodash.throttle (https://www.npmjs.com/package/lodash.throttle)
//      і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.

import Vimeo from '@vimeo/player';
import Throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);
// console.log('player:', player);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

player.on(
  'timeupdate',
  Throttle(function ({ seconds }) {
    save(LOCALSTORAGE_KEY, seconds);

    console.log('sec: ', seconds, ' minute: ', Number(seconds / 60).toFixed(1));
  }, 1000)
);

player.setCurrentTime(load(LOCALSTORAGE_KEY));