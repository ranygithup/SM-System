'use strict';
var MainProgramComponent = new function(){
    let mThis = this;
    this.title_prop = "Main Program";
    this.self = $('#_main_mainProgramComponent');

    this.tblMainProgram = mThis.self.find('#_mpg_tbl');
    this.btnNew = mThis.self.find('#_mpg_btn_new');

    this.init = () => {
        mThis.btnNew.on('click',function(e){
            e.preventDefault();
            let op = {
                'id': 0,
                'onClose': () => {
                    mThis.displayMainProgram();
                }
            };
            loadFormOption((html) => {
                main_program.html = html;
                main_program.show(op);
            });
        });

        mThis.tblMainProgram.on('click','a.btn-mpg-modify',function(e){
            e.preventDefault();
            let op = {
                'id': $(this).data('id'),
                'onClose': () => {
                    mThis.displayMainProgram();
                }
            }
            loadFormOption((html) => {
                main_program.html = html;
                main_program.show(op);
            });
        });

        mThis.tblMainProgram.on('click','a.btn-mpg-delete',function(e){
            e.preventDefault();
            let op = {
                'id': $(this).data('id')
            }
            interact.confirm('Delete this main program?',() => {
                api.postData('api/main-program/delete',op).then(res => {
                    if(res.status === 200){
                        mThis.displayMainProgram();
                    }
                });
            });
        });
    }

    this.displayMainProgram = (onFinish = null) => {
        api.getData('api/main-program/list').then(res => {
            let data = [];
            if(res.status === 200){
                data = res.data;
            }

            let cnt = 1;
            let cols = [{
                title: "No",
                data: () => {
                    return cnt++;
                }
            },
            {
                title: "Name",
                data: "name"
            },
            {
                title: "Department",
                data: "department"
            },
            {
                title: "Created",
                data: "created_at"
            },
            {
                title: "Action",
                data: (data, a, b) => {
                    return [`<div class="d-flex gap-2">
                        <a href="javascript:void(0)" class="btn-mpg-modify" data-id="${data.id}">
                            <i class="fa-regular fa-pen-to-square fs-5 text-warning"></i>
                        </a>
                        <a href="javascript:void(0)" class="btn-mpg-delete" data-id="${data.id}">
                            <i class="fa-regular fa-trash-can fs-5 text-danger"></i>
                        </a>
                    </div>`].join('');
                }
            }];

            if(mThis.table){
                mThis.tblMainProgram.DataTable().clear().destroy();
                mThis.tblMainProgram.empty();
                mThis.table = null;
            }

            if(!mThis.table){
                mThis.table = mThis.tblMainProgram.DataTable({
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
        mThis.displayMainProgram(() => {
            main_view.setTitle(mThis.title_prop);
            mThis.self.show().siblings().hide();
        });
    }
}

let loadFormOption = (onFinish = null) => {
    let html = null;
    api.getData('api/department/list').then(res => {
        let data = [], inner_html = null;
        if(res.status === 200){
            data = res.data;
        }

        data.map(op => {
            inner_html = [inner_html, `<option value="${op.id}">${op.name}</option>`].join('');
        });

        html = [`<div class="form-group">
            <label for="department_id" class="form-label">Department</label>
            <div class="width-select-in-form">
                <select class="modal-select2 form-control data-input" data-field="department_id">
                    ${inner_html}
                    <option selected></option>
                </select>
            </div>
        </div>
        <div class="form-group mt-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control data-input" data-field="name"/>
        </div>`].join('');

        if(typeof onFinish === 'function') onFinish(html);
    });
}

const main_program = new Modal({
    id: "main_program",
    title: "Main Program",
    api_save: 'api/main-program/save',
    api_modify: 'api/main-program/details'
});

window.addEventListener('DOMContentLoaded',() => {
    MainProgramComponent.init();
});