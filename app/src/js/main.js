$(document).ready(function() {
  $('img[data-src]').each(function(i,img) { img.src = img.dataset.src });
  $('input[type="tel"]').inputmask({"mask": "+7 (999) 999-99-99"});

  ////////////////////////////////////////////////////////////////////////////////////////////////
  // ТАБЫ

    // $('body').on('click', '.tabs__link', function(e) {
    //   e.preventDefault();
    //   const href = $(this).attr('href');

    //   if (href == "#") return;
    //   if ($(href).length == 0) return;

    //   $(this).closest('.tabs').find('.tabs__item').removeClass('tabs__item--active');
    //   $(this).closest('.tabs__item').addClass('tabs__item--active');

    //   $(this).closest('.tabs').find('.tabs__page').removeClass('tabs__page--active');
    //   $(href).addClass('tabs__page--active');
    // });

  // END ТАБЫ
  ////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////////
  // Модалки

    // // Открыть
    // $('body').on('click', '[data-modal]', function(e) {
    //   e.preventDefault();
    //   const modalId = `#modal--${$(this).data('modal')}`;
    //   if ($(modalId).length == 1) {
    //      $(modalId).addClass('modal--open');
    //      $('body').addClass('stop-scroll');
    //   }
    // });

    // // Закрыть
    // $('body').on('click', '.modal .modal__close, [data-modal-close]', function(e) {
    //   e.preventDefault();
    //   $(this).closest('.modal').removeClass('modal--open');
    //   $('body').removeClass('stop-scroll');
    // });

  // END Модалки
  ////////////////////////////////////////////////////////////////////////////////////////////////


  $('.top-sale-slider').slick({
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    autoplaySpeed: 1500,
  });

  $('.catalog-slider').slick({
    dots: false,
    arrows: true,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    prevArrow: '<button class="prev"></button>',
    nextArrow: '<button class="next"></button>',
    responsive: [
      {
        breakpoint: 770,
        settings: {
          dots: false,
          arrows: false,
          slidesToShow: 2.2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 400,
        settings: {
          dots: false,
          arrows: false,
          slidesToShow: 1.4,
          slidesToScroll: 1
        }
      },
    ]
  });

  $('body').on('click', '[data-rslider]', function(e) {
    e.preventDefault();
    var slider = $(this).data('rslider');
    if ($('#' + slider).length <= 0) return;
    $('.page-backdrop').addClass('page-backdrop--open');
    $('#' + slider).addClass('right-slider--open');
    $('body').addClass('stop-scroll');
  });

  $('body').on('click', '.right-slider .close, [data-rslider-close]', function(e) {
    e.preventDefault();
    $(this).closest('.right-slider').removeClass('right-slider--open');
    $('.page-backdrop').removeClass('page-backdrop--open');
    $('body').removeClass('stop-scroll');
  });

  $('body').on('click', '.field-select', function(e) {
    e.preventDefault();
    $(this).toggleClass('field-select--open');
  });

  $('body').on('click', '.field-select__item', function(e) {
    e.preventDefault();
    $(this).closest('.field-select__items').find('.field-select__item').removeClass('field-select__item--selected');
    $(this).addClass('field-select__item--selected');
  });

  $('body')
    .on('mouseenter', '.page-header__menu-item--dropdown', function () {
      $(this).find('.dropdown-menu').addClass('dropdown-menu--open');
      $('.page-backdrop').addClass('page-backdrop--open');
    })
    .on('mouseleave', '.page-header__menu-item--dropdown', function () {
      $(this).find('.dropdown-menu').removeClass('dropdown-menu--open');
      $('.page-backdrop').removeClass('page-backdrop--open');
    });

  $('body').on('click', '.dropdown__title', function(e) {
    e.preventDefault();
    $('.dropdown').removeClass('dropdown--open');
    $(this).closest('.dropdown').toggleClass('dropdown--open');
  });
  $('body').on('click', '.dropdown__item', function(e) {
    e.preventDefault();
    $(this).closest('.dropdown__items').find('.dropdown__item').removeClass('dropdown__item--selected');
    $(this).addClass('dropdown__item--selected');
    $(this).closest('.dropdown').removeClass('dropdown--open');
  });

  $('body').on('click', '.catalog-filter__title', function(e) {
    e.preventDefault();
    $(this).closest('.catalog-filter__block').toggleClass('catalog-filter__block--open');
  });


  $('body').on('click', '.radio-option .field-radio', function(e) {
    $(this).closest('.page-checkout__radio-options').find('.radio-option').removeClass('radio-option--open');
    $(this).closest('.radio-option').addClass('radio-option--open');
  });

  $('body').on('click', '.burger', function(e) {
    e.preventDefault();
    $(this).toggleClass('burger--toggle');
    $('.mobile-menu').toggleClass('mobile-menu--toggle');
  });


  function setIndicatorValue(indicator, value) {
    if ($(indicator).length) {
      $(indicator).text(value + ' ₽');
    }

    if ($('input' + indicator).length) {
      $(indicator).val(value);
    }
  }

  $('.field-range-slider .range-slider').each(function(i, item) {
    noUiSlider.create(item, {
      start: [$(item).data('start'), $(item).data('end')],
      step: 1,
      range: {
        'min': $(item).data('min'),
        'max': $(item).data('max')
      },
    });
    item.noUiSlider.on('update', function(values, handle) {
      setIndicatorValue($(item).data('left-indicator'), values[0]);
      setIndicatorValue($(item).data('right-indicator'), values[1]);
    });
  });

  $('body').on('keydown', '.code-input input', function(e) { $(this).val('') });
  $('body').on('keyup', '.code-input input', function(e) {
    var $wrap = $(this).closest('.code-input');
    var $inputs = $(this).closest('.code-input').find('input[type="number"]');
    var $val = $(this).val();

    // Ввод только цифр и не больше 10
    if ($val == $val.replace(/[0-9]/, '') || $val > 10) {
      $(this).val('');
      // if (e.code == 'Backspace') {
      //   // Передача фокуса предыдущему input
      //   $inputs.eq($inputs.index(this) - 1).focus();
      // }
      return false;
    }

    // Передача фокуса следующему input
    $inputs.eq($inputs.index(this) + 1).focus();

    // Заполнение input hidden
    var fullval = '';
    $inputs.each(function() {
      fullval = fullval + (parseInt($(this).val()) || '0')
    });
    $wrap.find('input[type="hidden"]').val(fullval);
  });

  $('body').on('click', '.accordion__item', function(e) {
    e.preventDefault();
    $('.accordion__item').removeClass('accordion__item--open');
    $(this).addClass('accordion__item--open');
  });
});
