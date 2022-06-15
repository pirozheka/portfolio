const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close'),
    overlay = document.querySelector('.menu__overlay');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    });

    closeElem.addEventListener('click', () => {
        menu.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
        menu.classList.remove('active');
    });

//скрипт автоматического пересчета процентов
const counters = document.querySelectorAll('.skills__percentage'),
        lines = document.querySelectorAll('.skills__scale-top');

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});

//smooth scroll and page up
$(window).scroll(function() {
    if ($(this).scrollTop() > 1400) {
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

//Modal
$('.modal__close').on('click', function() {
    $('.overlay, #thanks').fadeOut('slow');
});


$('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('.overlay, #thanks').fadeIn('slow');
        $('form').trigger('reset');
    });
    return false;
});