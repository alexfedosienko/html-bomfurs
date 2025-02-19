$(document).ready(function() {
  $('img[data-src]').each(function(i,img) { img.src = img.dataset.src });
  $('input[type="tel"]').inputmask({"mask": "+7 (999) 999-99-99"});


  $('body').on('click', '.scroll-to-screen', function(e) {
    e.preventDefault();
    var screen = $(this).data('screen');

    if (screen) {
      $('html, body').animate({
        scrollTop: $(screen).offset().top
      }, 200, "linear", function() {
        scrolling = false;
      });
    }
  })

  $(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
      $('.top-sale-slider').css('position', 'initial');
      $('.page-header').css('top', 0);
    } else {
      $('.top-sale-slider').css('position', 'fixed');
      $('.page-header').css('top', '40px');
    }
  });

  // $(document).bind('mousewheel DOMMouseScroll', function(e) {
  //   console.log(e.originalEvent);
  //   // console.log({
  //   //   clientX: e.originalEvent.clientX,
  //   //   clientY: e.originalEvent.clientY,

  //   //   offsetX: e.originalEvent.offsetX,
  //   //   offsetY: e.originalEvent.offsetY,

  //   //   pageX: e.originalEvent.pageX,
  //   //   pageY: e.originalEvent.pageY,

  //   // })
  // });

  // var num = 1;
  // var scrolling = false;

  // function scroll(event) {
  //   event.preventDefault();
  //   if (!scrolling) {
  //     scrolling = true;
  //     if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
  //       num--;
  //       num = num < 1 ? 1 : num;
  //     } else {
  //       num++;
  //       num = num > $(".screen").length ? $(".screen").length : num;
  //     }

  //     $('html, body').animate({
  //       scrollTop: $(".screen" + num).offset().top
  //     }, 500, "linear", function() {
  //       scrolling = false;
  //     });
  //   }
  // }


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

  $('.top-sale-slider__wrapper').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
    $('.top-sale-slider .current').text((currentSlide || 0) + 1);
    $('.top-sale-slider .max').text(slick.slideCount);
  });

  $('.top-sale-slider__wrapper').slick({
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

  $('.catalog-grid .product-item__pics-wrapper').slick({
    dots: true,
    arrows: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    prevArrow: '<button class="prev"></button>',
    nextArrow: '<button class="next"></button>',
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
  $('body').on('click', '.page-backdrop--open', function(e) {
    if ($('.right-slider--open').length > 0) {
      $('.page-backdrop').removeClass('page-backdrop--open');
      $('.right-slider--open').removeClass('right-slider--open');
      $('body').removeClass('stop-scroll');
    }
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
    // e.preventDefault();
    $(this).closest('.dropdown__items').find('.dropdown__item').removeClass('dropdown__item--selected');
    $(this).addClass('dropdown__item--selected');
    $(this).closest('.dropdown').removeClass('dropdown--open');
  });

  $(document).mouseup(function(e) {
    var dropdown = $(".dropdown"); // тут указываем ID элемента
    // если клик был не по нашему блоку и не по его дочерним элементам
    if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0 ) {
      $('.dropdown').removeClass('dropdown--open');
    }
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

  $('body').on('click', '.page-product__img', function(e){
    e.preventDefault();
    $('.picture-viewer').addClass('picture-viewer--open');
    $('body').addClass('stop-scroll');
  });
  $('body').on('click', '.picture-viewer__close', function(e) {
    e.preventDefault();
    $('.picture-viewer').removeClass('picture-viewer--open');
    $('body').removeClass('stop-scroll');
  });
  $('body').on('click', '.picture-viewer__slide-link', function(e) {
    e.preventDefault();
    var src = $(this).data('full-src');
    if (!src.length) return;
    $('.picture-viewer__slide-link').removeClass('active');
    $(this).addClass('active');
    $('.picture-viewer__wrapper').css("background-image", "url('" + src + "')");
  });

  // $('body').on('click', '.product-item__favorite-btn, .page-product__favorite-btn', function(e) {
  //   e.preventDefault();
  //   $(this).find('.icon--favorite').toggleClass('active');
  // });

});
