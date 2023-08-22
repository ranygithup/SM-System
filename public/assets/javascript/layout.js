window.addEventListener('DOMContentLoaded', () => {
    let list_menu = $('#list_menu_toggle'),
    container = $('#container_toggle'), side_toggle = $('#toggle_aside');

    side_toggle.on('click',function(e){
        e.preventDefault();
        if(list_menu.hasClass('menu-layout-icons')){
            list_menu.removeClass('menu-layout-icons').addClass('menu-layout');
            container.removeClass('container-layout-icons').addClass('container-layout');
        }
        else{
            list_menu.removeClass('menu-layout').addClass('menu-layout-icons');
            container.removeClass('container-layout').addClass('container-layout-icons');
        }
    });

    const mediaQuery = window.matchMedia('(max-width: 750px)');
    function handleViewportChange(mediaQuery) {
        if(mediaQuery.matches){
            side_toggle.trigger('click');
        }
        else{
            side_toggle.trigger('click');
        }
    }
    mediaQuery.addListener(handleViewportChange);

    let div_user = $('#tnc_toggle_usg'),
    icons_user = $('#tnc_toggle_user');

    icons_user.on('click',function(e){
        e.preventDefault();
        div_user.toggle('slow');
    });

    $(document).on('mouseup',function(e){
        e.preventDefault();
        if(!div_user.is(e.target) && div_user.has(e.target).length === 0 && !icons_user.is(e.target)){
            div_user.hide('slow');
        }
    });
});