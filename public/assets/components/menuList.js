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
                html = [html,`<li data-component="${list.component}" class="menu-clickable">
                    <span class="pe-2">
                        <img class="mnu_icons_" src="${document.baseURI}icons/${list.icon}" alt=""/>
                    </span>
                    <span class="list-menu-title">${list.name}</span>
                </li>`].join('');
            });
        }
        html = [html,'</ul>'].join('');

        let div = document.querySelector(`#${this.id}`);
        div.innerHTML = html;

        let menu = $(div).find('.menu-clickable');
        menu.on('click',function(e){
            e.preventDefault();
            $(this).addClass('menu-selected').siblings().removeClass('menu-selected');

            let component = $(this).data('component'),
            com = window[component];
            com.show(null);
        });
        menu.first().trigger('click');
    }
}