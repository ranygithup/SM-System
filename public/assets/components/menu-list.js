class Menu{
    constructor(id, list_menu=[]){
        this.id = id;
        this.menu = list_menu;
    }

    renderMenu = () => {
        let html = ['<ul>'].join('');
        if(this.menu.length > 0){
            this.menu.map(list => {
                html = [html,`<li>
                    <span class="pe-2">
                        <i class="fa-solid fa-chart-line"></i>
                    </span>
                    <span class="list-menu-title">${list}</span>
                </li>`].join('');
            });
        }
        html = [html,'</ul>'].join('');
        $(`#${this.id}`).html(html);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    let menus_list = ['Dashboard'];
    const menu = new Menu('list_menus',menus_list);
    menu.renderMenu();
});