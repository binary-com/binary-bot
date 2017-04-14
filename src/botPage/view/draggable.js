/* eslint-disable */
$.fn.drags = function(opt) {
  opt = $.extend(
    {
      handle: '',
      cursor: 'move',
    },
    opt,
  );

  if (opt.handle === '') {
    var $el = this;
  } else {
    var $el = this.find(opt.handle);
  }

  return $el
    .css('cursor', opt.cursor)
    .on('mousedown', function(e) {
      if (opt.handle === '') {
        var $drag = $(this).addClass('draggable');
      } else {
        var $drag = $(this).addClass('active-handle').addClass('draggable');
      }
      var drg_h = $drag.outerHeight(),
        drg_w = $drag.outerWidth(),
        pos_y = $drag.offset().top + drg_h - e.pageY,
        pos_x = $drag.offset().left + drg_w - e.pageX;
      $drag.on('mousemove', function(e) {
        $('.draggable')
          .offset({
            top: e.pageY + pos_y - drg_h,
            left: e.pageX + pos_x - drg_w,
          })
          .on('mouseup', function() {
            $(this).removeClass('draggable');
          });
      });
      e.preventDefault(); // disable selection
    })
    .on('mouseup', function() {
      if (opt.handle === '') {
        $(this).removeClass('draggable');
      } else {
        $(this).removeClass('active-handle').removeClass('draggable');
      }
    });
};
