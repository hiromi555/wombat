$(function () {

  $('.js-button-hamburger').click(function () {
    $('body').toggleClass('is-active-drower');

    if ($(this).attr('aria-expanded') == 'false') {
      $(this).attr('aria-expanded', true);
    } else {
      $(this).attr('aria-expanded', false);
    }
  });

});
//-------place----------
$(function () {
  $('.tab li a').click(function () {
    $('.item').removeClass('is-active-tab');
    var id = $(this).attr('href')
    $(id).addClass('is-active-tab');
    return false;
  });
});

$(function () {
  $('.tab li a').click(function () {
    $('.tab li a').removeClass('is-selected');
    $(this).addClass('is-selected');
    return false;
  });
});

//-------photo-------------
$(function () {
  $('.js-modal').click(function () {
    $('main').append('<div class="overlay"></div>');
    $('main').addClass('over')
    $('.overlay').fadeIn(1200);
    var target = $(this).attr('href');
    var larg = '<img src ="' + target + '"class="content">';
    $('.overlay').append(larg);
    return false;
  })
  $('main').on('click', '.overlay', function () {
    $(this).fadeOut(800, function () {
      $(this).remove();
    });
    $('main').removeClass('over');
  });
});
