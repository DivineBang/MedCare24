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
        menuImage.attr('src', 'assets/img/burger.png');
    } else {
        menuImage.attr('src', 'assets/img/close__burger.png');
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