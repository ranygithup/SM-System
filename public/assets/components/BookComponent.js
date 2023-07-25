'use strict';
var BookComponent = new function(){
    let mThis = this;
    this.title_prop = "Books";
    this.self = $("#_main_bookComponent");

    this.btnNew = mThis.self.find('#_bok_btn_new');
    this.tblBook = mThis.self.find('#_bok_tbl');

    this.init = () => {
        mThis.btnNew.on('click',function(e){
            e.preventDefault();
            let op = {
                'id': 0,
                'onClose': () => {
                    mThis.displayBook();
                }
            };
            book.show(op);
        });
    }

    this.displayBook = (onFinish = null) => {
        api.getData().then(res => {
            let data = [];
            if(res.status === 200){
                data = res.data;
            }

            if(typeof onFinish === 'function') onFinish();
        });
    }

    this.show = (options) => {
        if(!options) options = {};
        main_view.setTitle(mThis.title_prop);
        mThis.self.show().siblings().hide();
    }
}

let html = [`<div class="row gy-2">
    <div class="col-lg-4">
        <div class="bok-dlg-image">
            <div id="bok_dlg_empty" class="bok-dlg-image-empty">
                <i class="fa-regular fa-image text-muted fs-3"></i>
            </div>
        </div>
    </div>
    <div class="col-lg-8">
        <div class="form-group">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control data-input" data-field="title"/>
        </div>
        <div class="form-group mt-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control data-input" data-field="description"></textarea>
        </div>
    </div>
</div>`].join('');

const book = new Modal({
    id: 'dlg_bok_',
    title: 'Book',
    class_name: 'modal-lg',
    image: 'bok_dlg_empty',
    html: html
});

window.addEventListener('DOMContentLoaded',() => {
    BookComponent.init();
});