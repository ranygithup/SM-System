class MainView{
    setTitle = (title_prop) => {
        let title = $('#screen_title');
        title.text(title_prop);
    }
}
const main_view = new MainView();

class Menu{
    constructor(id, list_menu=[]){
        this.id = id;
        this.menu = list_menu;
        this.renderMenu();
    }

    renderMenu = () => {
        let html = ['<ul>'].join('');
        if(this.menu.length > 0){
            this.menu.map(list => {
                let subHtml = null;

                if(list.sub_menu && list.sub_menu.length > 0){
                    list.sub_menu.map(sub_list => {
                        subHtml = [subHtml,`<li data-component="${sub_list.component}" class="menu-clickable">
                            <span class="pe-2">
                                <img class="mnu_icons_" src="${document.baseURI}icons/${sub_list.icon}" alt=""/>
                            </span>
                            <span class="list-menu-title">${sub_list.name}</span>
                        </li>`].join('');
                    });
                }

                html = [html,`<li ${list.component ? `data-component="${list.component}" class="menu-clickable"`:`class="menu-dropdown"`}>
                    <span class="pe-2">
                        <img class="mnu_icons_" src="${document.baseURI}icons/${list.icon}" alt=""/>
                    </span>
                    <span class="list-menu-title">${list.name}</span>
                    ${list.component ? '':`<span class="float-end">
                        <i class="fa-solid fa-chevron-right sign-down"></i>
                    </span>`}
                    ${subHtml ? `<div class="sub-list-menu"><ul>${subHtml}</ul></div>`:''}
                </li>`].join('');
            });
        }
        html = [html,'</ul>'].join('');

        let div = document.querySelector(`#${this.id}`);
        div.innerHTML = html;

        let menu = $(div).find('.menu-clickable');
        let dropdown = $(div).find('.menu-dropdown');

        menu.on('click',function(e){
            e.preventDefault();
            $(this).addClass('menu-selected').siblings().removeClass('menu-selected');

            let component = $(this).data('component'),
            com = window[component];
            com.show(null);
        });
        menu.first().trigger('click');

        dropdown.on('click',function(e){
            e.preventDefault();
            let div = $(this).find('.sub-list-menu');
            if(!div.is(e.target) && div.has(e.target).length !== 0){
                return false;
            }
            else{
                $(this).toggleClass('dropdown-open').siblings().removeClass(['dropdown-open','menu-selected']);
            }
        });
    }
}