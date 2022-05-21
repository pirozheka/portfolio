/* $(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        //adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
              },
        ]
    });
  }); */

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    responsive: {
        350: {
            navContainer: true,
            nav: true,
            navPosition: "bottom",
            autoplay: true
        },
        1100: {
            nav: false
        }
    }
});

document.querySelector('.prev').addEventListener('click', () => {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', () => {
    slider.goTo('next');
});

$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
});

function toggleSlide(item) {
    $(item).each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');

        });
    });
};

toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__back');

//Modal
//вешаем обработчик на кнопку консультации
$('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
});
//обработчик на крестик
$('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
});
//обработчик купить
$('.button_mini').on('click', function() {
    $('.overlay, #order').fadeIn('slow');
});

//вытягиваем текст с карточки и вставляем в форму заказа
$('.button_mini').each(function(i) {
    $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    });
});

//validator
function valideForms(form) {
    $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          email: {
            required: true,
            email: true
          },
          phone: {
            required: true 
          }
        },
        messages: {
          name: "Пожалуйста, введите имя",
          email: {
            required: "Введите e-mail",
            email: "Почта должна быть в формате name@domain.com"
          },
          phone: {
            required: "Введите корректный номер телефона"
          }
        }
      });
}

valideForms("#consultation form");
valideForms("#order form");
valideForms("#main_form form");

  $(function() {
    $('input[name=phone]').mask('+7(000)000-00-00');
  });

$('form').submit(function(e){
  e.preventDefault();
//валидация формы - чтобы она не пропускала пустые данные
  if(!$(this).valid()) {
    return;
  }

  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize()
  }).done(function(){
    $(this).find("input").val("");
    $("#consultation, #order").fadeOut();
    $('.overlay, #thanks').fadeIn('slow');
    $('form').trigger('reset');

  });
  return false;
});

//scroll - SMOOTH SCROLL
$(window).scroll(function() {
  if($(this).scrollTop() > 1600) {
    $('.pageup').fadeIn();
  } else {
    $('.pageup').fadeOut();
  }
});

$("a").on('click', function(event) {

  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {
    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function(){

      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  } // End if
});

new WOW().init();