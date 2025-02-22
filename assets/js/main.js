//preloader
$(document).ready(function() {
  $('#preloader').fadeOut(400);
});  


$('.header__menu').click(function (event) {
  $('.menu').toggleClass('active__menu');
  });

// Изменять иконку burger при клике
$('.header__menu').click(function (event) {
    var menuImage = $('.burger__img');
    if (menuImage.attr('src').includes('close__burger')) {
        menuImage.attr('src', 'assets/img/burger.svg');
    } else {
        menuImage.attr('src', 'assets/img/close__burger.svg');
    }
});

//language__dropdown
$(document).ready(function() {
  $('.language__set').click(function(event) {
      event.stopPropagation();
      $('.language__dropdown').slideToggle();
      $(this).toggleClass('active');
  });
  $(document).click(function() {
      $('.language__dropdown').slideUp();
      $('.language__set').removeClass('active');
  });
});

//accordion
document.querySelectorAll('.accordion-header').forEach(button => {
  button.addEventListener('click', () => {
      const body = button.nextElementSibling; // Найти тело аккордеона
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Закрыть все остальные элементы
      document.querySelectorAll('.accordion-header').forEach(btn => {
          btn.setAttribute('aria-expanded', 'false');
          btn.nextElementSibling.classList.remove('active');
      });

      // Если текущий элемент не был открыт, открываем его
      if (!isExpanded) {
          button.setAttribute('aria-expanded', 'true');
          body.classList.add('active');
      }
  });
});

//services

$(document).ready(function () {
  // Определяем текущий язык
  // Определяем текущий язык
  var currentLanguage = window.location.pathname.includes('-de.html') ? 'de' :
  window.location.pathname.includes('-en.html') ? 'en' :
  window.location.pathname.includes('-ru.html') ? 'ru' :
  window.location.pathname.includes('-ua.html') ? 'ua' :
  window.location.pathname.includes('-ka.html') ? 'ka' :
  window.location.pathname.includes('-uz.html') ? 'uz' : 'en'; // по умолчанию на английский

  // Загрузка соответствующего JSON файла
  var jsonFile = currentLanguage === 'de' ? 'assets/js/services-de.json' :
  currentLanguage === 'en' ? 'assets/js/services-en.json' :
  currentLanguage === 'ru' ? 'assets/js/services-ru.json' :
  currentLanguage === 'ua' ? 'assets/js/services-ua.json' :
  currentLanguage === 'ka' ? 'assets/js/services-ka.json' :
  currentLanguage === 'uz' ? 'assets/js/services-uz.json' : 'assets/js/services-en.json'; // по умолчанию на английский


  // Загрузка данных из JSON
  $.getJSON(jsonFile, function(data) {
      // Для каждого блока с классом "services__wrapp"
      $(".services__wrapp").each(function() {
          let parentBlock = $(this); // Родительский блок
          let blockClass = parentBlock.attr("class").split(" ").find(cls => cls.startsWith("services__wrapp_"));
          let blockId = blockClass ? blockClass.replace("services__wrapp_", "") : "1"; // Получаем ID блока

          let defaultText = data[blockClass].default; // Исходный текст из JSON
          let defaultImage = `services_${blockId}.png`; // Исходное изображение

          let textBlock = parentBlock.find(".services__wrapp_text"); // Текстовый блок
          textBlock.text(defaultText); // Устанавливаем исходный текст

          // Сохраняем исходное изображение в данных блока
          parentBlock.data('originalImage', defaultImage);

          // Устанавливаем фоновое изображение для блока
          let imageUrl = `assets/img/${defaultImage}`;
          parentBlock.css({
              background: `url(${imageUrl}) center / cover no-repeat, rgba(26, 51, 38, 0.9)` // Исходное изображение
          });

          // Применяем цвет текста и стили для исходного состояния
          textBlock.css({ color: "#fff" });
      });

      // Обработка клика по кнопке
      $(".services__btn").click(function (e) {
          e.preventDefault(); // Отменяем переход по ссылке

          let parentBlock = $(this).closest(".services__wrapp"); // Находим родительский блок
          let textBlock = parentBlock.find(".services__wrapp_text"); // Находим текущий текстовый блок
          let button = $(this); // Кнопка
          let isExpanded = parentBlock.hasClass('expanded'); // Проверка, расширен ли блок

          // Если блок не расширен, меняем текст и фон
          if (!isExpanded) {
              parentBlock.addClass('expanded'); // Добавляем класс для отслеживания состояния
              button.hide(); // Скрываем кнопку

              // Получаем класс блока
              let blockClass = parentBlock.attr("class").split(" ").find(cls => cls.startsWith("services__wrapp_"));
              let blockId = blockClass ? blockClass.replace("services__wrapp_", "") : "1"; // Извлекаем id из класса (например, 1 для services__wrapp_1)
              let newText = data[blockClass].expanded; // Получаем текст для развернутой версии
              let newImage = `services_${blockId}.png`; // Формируем имя изображения

              // Сохраняем исходное изображение перед изменениями
              parentBlock.data('originalImage', newImage);

              // Формируем путь к изображению
              let imageUrl = `assets/img/${newImage}`;

              // Заменяем текст на новый и добавляем класс для стилизации
              textBlock.text(newText).addClass("services__wrapp_text_expanded");
              parentBlock.css({
                  background: "#fff" // Устанавливаем белый фон при развертывании
              });
              textBlock.css({color: "#000"}); // Меняем цвет текста на черный
              button.css({background: "#000", color: "#fff"}); // Меняем стиль кнопки
          }
      });

      // Обработка клика по самому блоку
      $(".services__wrapp").click(function (e) {
          // Если клик был по кнопке, не делать ничего
          if ($(e.target).is(".services__btn")) return;

          let parentBlock = $(this); // Блок
          let button = parentBlock.find(".services__btn"); // Кнопка
          let textBlock = parentBlock.find(".services__wrapp_text"); // Исходный текст

          // Получаем класс блока
          let blockClass = parentBlock.attr("class").split(" ").find(cls => cls.startsWith("services__wrapp_"));
          let originalText = data[blockClass].default; // Получаем исходный текст для текущего блока
          
          // Получаем исходное изображение из данных, сохраненных при развертывании
          let originalImage = parentBlock.data('originalImage') || `services_1.png`; // Если нет, возвращаем дефолтное

          // Формируем путь к изображению
          let imageUrl = `assets/img/${originalImage}`;

          // Если клик был по блоку и блок развернут, возвращаем исходный текст и изображение
          if (parentBlock.hasClass('expanded')) {
              parentBlock.removeClass('expanded'); // Убираем класс
              button.show(); // Показываем кнопку

              // Восстанавливаем исходный текст
              textBlock.text(originalText).removeClass("services__wrapp_text_expanded");
              parentBlock.css({
                  background: `url(${imageUrl}) center / cover no-repeat, rgba(26, 51, 38, 0.9)` // Восстанавливаем фоновое изображение
              });
              button.css({background: "transparent", color: "#fff"}); // Восстанавливаем стиль кнопки
              textBlock.css({color: "#fff"}); // Восстанавливаем цвет текста
          }
      });
  });
});

