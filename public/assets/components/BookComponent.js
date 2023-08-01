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
        api.getData('api/book/list').then(res => {
            let data = [];
            if(res.status === 200){
                data = res.data;
            }

            let cols = [{
                title: "Name",
                data: "name"
            },
            {
                title: "Photo",
                data: (data, a, b) => {
                    let image = data.image_url ? data.image_url : '';
                    return [`<img class="tbl-image" src="${image}" alt=""/>`].join('');
                }
            },
            {
                title: "Program",
                data: "program"
            },
            {
                title: "Department",
                data: "department"
            },
            {
                title: "Description",
                data: "description"
            },
            {
                title: "Action",
                data: (data, a, b) => {
                    return [`<div class="d-flex gap-2">
                        <a href="javascript:void(0)" class="btn-dpm-modify" data-id="${data.id}">
                            <i class="fa-regular fa-pen-to-square text-warning fs-5"></i>
                        </a>
                        <a href="javascript:void(0)" class="btn-dpm-delete" data-id="${data.id}">
                            <i class="fa-regular fa-trash-can text-danger fs-5"></i>
                        </a>
                    </div>`].join('');
                }
            }];

            if(mThis.table){
                mThis.tblBook.DataTable().clear().destroy();
                mThis.tblBook.empty();
                mThis.table = null;
            }

            if(!mThis.table){
                mThis.table = mThis.tblBook.DataTable({
                    searching: false,
                    destroy: true,
                    paging: true,
                    ordering: false,
                    retrive: true,
                    info: true,
                    pageLength: 5,
                    bLengthChange: false,
                    saveState: true,
                    processing: true,
                    language: {
                        loadingRecords: "&nbsp",
                        processing: "Loading...",
                        emptyTable:"No data to display"
                    },
                    data: data,
                    columns: cols,
                    createdRow: (row, data, dataIndex) => {
                        let tr = $(row);
                        tr.data("id", data.id);
                    }
                });
            }
            
            if(typeof onFinish === 'function') onFinish();
        });
    }

    this.show = (options) => {
        if(!options) options = {};
        mThis.displayBook(() => {
            main_view.setTitle(mThis.title_prop);
            mThis.self.show().siblings().hide();
        });
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
        <div class="row row-cols-lg-2 gy-3">
            <div class="col">
                <div class="form-group">
                    <label for="name" class="form-label">Title</label>
                    <input type="text" class="form-control data-input" data-field="name"/>
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="program_id" class="form-label">Program</label>
                    <div class="width-select-in-form">
                        <select class="modal-select2 data-input" data-field="program_id"></select>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="department_id" class="form-label">Program</label>
                    <div class="width-select-in-form">
                        <select class="modal-select2 data-input" data-field="department_id"></select>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control data-input" data-field="description"></textarea>
                </div>
            </div>
        </div>
    </div>
</div>`].join('');

const book = new Modal({
    id: 'dlg_bok_',
    title: 'Book',
    class_name: 'modal-lg',
    image: 'bok_dlg_empty',
    html: html,
    api_save:'api/book/save'
});

window.addEventListener('DOMContentLoaded',() => {
    BookComponent.init();
});