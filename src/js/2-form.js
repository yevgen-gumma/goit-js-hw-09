const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key = 'empty') {
  const data = localStorage.getItem(key);

  try {
    const result = JSON.parse(data);
    return result;
  } catch {
    return data;
  }
}

// Створюємо прослуховувач події input, вішаючи його на всю форму (делегування).
// Коли у форму будуть вводити текст, значення 1-го та 2-го unputa додається в об'єкт,
// і буде збережено в local storage.
form.addEventListener('input', () => {
  // створюємо змінні для значень полів вводу
  const userName = form.elements.email.value;
  const userMessage = form.elements.message.value;

  // створюємо об'єкт, в який дадається текст полів вводу під час кожного нового символу
  const data = {
    email: userName,
    message: userMessage,
  };

  // викликаємо ф-цію збереження всього що вводиться в полях до Local Storage
  saveToLS(STORAGE_KEY, data);
});

// створюємо код для відновлення тексту, що був в полях вводу, якщо сторінка закрилась
// і її відкрили знову
function restoreData() {
  const data = loadFromLS(STORAGE_KEY) || {};
  form.elements.email.value = data.email || '';
  form.elements.message.value = data.message || '';
}
restoreData();

// додаємо дії, які виконуються під час події submit
form.addEventListener('submit', e => {
  e.preventDefault();

  // створюємо змінні для значень полів вводу
  const userName = form.elements.email.value;
  const userMessage = form.elements.message.value;

  // перевіряємо чи обидва поля вводу є заповненими
  if (userName.trim() === '' || userMessage.trim() === '') {
    alert('Please fill in both fields of the form');
    return;
  }

  // під час події submit дістаємо дані з Local Storage
  const data = loadFromLS(STORAGE_KEY) || {};

  //виводимо в консоль об'єкт з полями email та message
  console.log(data);

  // очищаємо поля вводу форми
  form.reset();

  // очищаємо сховище Local Storage
  localStorage.removeItem(STORAGE_KEY);
});
