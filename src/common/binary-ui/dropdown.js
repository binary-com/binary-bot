/* eslint-disable */

/*
 * js code for Drop-Down Menu
 */

function hide_menu($element) {
    $element.animate({ opacity: 0 }, 100, function() {
        $element.css('visibility', 'hidden').css('display', 'none');
    });
}

function show_menu($element) {
    $element
        .css('visibility', 'visible')
        .css('display', 'block')
        .animate({ opacity: 1 }, 100);
}

function navMenuListener() {
    $('.nav-menu').on('click', function(event) {
        event.stopPropagation();
        hide_menu($('.top-nav-menu li ul'));
        hide_menu($('#language_select, #select_language'));
        let $el;
        if ($(this).is('#toolbox-main-account')) {
            $el = $('#toolbox-all-accounts');
            hide_menu($('#all-accounts'));
        } else {
            $el = $('#all-accounts');
            hide_menu($('#toolbox-all-accounts'));
        }

        if ($el.css('opacity') == 1) {
            hide_menu($el);
        } else {
            show_menu($el);
        }
    });
}

function topNavMenuListener() {
    $('.top-nav-menu > li').on('click', function(event) {
        event.stopPropagation();
        hide_menu($('#all-accounts, #toolbox-all-accounts'));
        hide_menu($('#language_select, #select_language'));
        var childMenu = $(this).find(' > ul'),
            $el = $('.top-nav-menu li ul');
        if (
            childMenu.css('opacity') == 1 &&
            $(event.target)
                .find('span')
                .hasClass('nav-caret')
        ) {
            hide_menu($el);
        } else if (
            childMenu.css('opacity') == 0 &&
            $(event.target)
                .find('span')
                .hasClass('nav-caret')
        ) {
            $el.animate({ opacity: 0 }, 100, function() {
                $el.css('visibility', 'hidden');
                show_menu(childMenu);
            });
        }
    });
}

function documentListener() {
    $(document).on('click', function() {
        hide_menu($('#all-accounts, #toolbox-all-accounts'));
        hide_menu($('.top-nav-menu li ul'));
        hide_menu($('#language_select, #select_language'));
    });
}

function langListener() {
    $('.languages').on('click', function(event) {
        event.stopPropagation();
        hide_menu($('.top-nav-menu li ul'));
        hide_menu($('#all-accounts, #toolbox-all-accounts'));
        var $el = $('#language_select, #select_language');
        if ($el.css('opacity') == 1) {
            hide_menu($el);
        } else {
            show_menu($el);
        }
    });
}

function initMenuContent(_menu_containers) {
    var listeners_events = [];
    _menu_containers.filter(':not(.follow-default)').delegate('.tm-a,.tm-a-2', 'click', function(event) {
        event.preventDefault();

        var target = $(event.target);
        var tab_id = target.parents('li:first').attr('id');

        if (tab_id) {
            var tab_container = target.parents('.tm-ul');

            var selected_tab =
                // find previously active tab
                tab_container
                    .find('.tm-a,.tm-a-2')
                    // remove previously active tab
                    .removeClass('a-active')
                    .end()
                    // unwrap previously active tab
                    .find('.menu-wrap-a .tm-a')
                    .unwrap()
                    .unwrap()
                    // go back to selected target
                    .end()
                    .end()
                    // set active class to it
                    .addClass('a-active')
                    // set active class to its parent as well
                    .parents('.tm-li')
                    .addClass('active')
                    .removeClass('hover')
                    .find('.tm-li-2')
                    .addClass('active')
                    .end()
                    // wrap it
                    .find('.tm-a')
                    .wrap('<span class="menu-wrap-a"><span class="menu-wrap-b"></span></span>')
                    .end()
                    // remove previously active parent
                    .siblings()
                    .removeClass('active')
                    .find('.tm-li-2')
                    .removeClass('active')
                    .end()
                    .end()
                    .end();

            // replace span to a, to make it clickable for real
            var span_tm_a = tab_container.find('span.tm-a');
            span_tm_a.replaceWith('<a href="#" class="' + span_tm_a.attr('class') + '">' + span_tm_a.html() + '</a>');

            var menu_li = selected_tab.parents('li');
            var sub_menu_selected = menu_li.find('.tm-ul-2 .a-active');
            var selected_tab_id = menu_li.attr('id');

            if (!sub_menu_selected.length) {
                sub_menu_selected = menu_li.find('.tm-a-2:first').addClass('a-active');

                if (sub_menu_selected.length) {
                    selected_tab = sub_menu_selected;
                    selected_tab_id = sub_menu_selected.parents('li').attr('id');
                    selected_content = $('#' + selected_tab_id + '-content').removeClass('invisible');
                } else {
                    selected_tab_id = menu_li.attr('id');
                }
            }

            var selected_content = $('#' + selected_tab_id + '-content')
                // show selected tab content
                .removeClass('invisible')
                // and hide the rest
                .siblings(':not(.sticky)')
                .addClass('invisible')
                .end();

            push_to_listeners({
                id: selected_tab_id,
                target: selected_tab,
                content: selected_content,
                menu: menu_li.parents('ul.tm-ul'),
                event: event,
            });
        }
        return false;
    });
    function push_to_listeners(info) {
        // push to listeners events
        for (var i = 0; i < listeners_events.length; i++) {
            listeners_events[i](info);
        }
    }
}

navMenuListener();
topNavMenuListener();
documentListener();
langListener();
