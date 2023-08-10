'use strict';
var LevelComponent = new function(){
    let mThis = this;
    this.title_prop = 'Level';
    this.self = $('#_main_levelComponent');

    this.tblLevel = mThis.self.find('#_lvl_tbl');
    this.btnNew = mThis.self.find('#_lvl_btn_new');

    this.init = () => {
        mThis.btnNew.on('click',function(e){
            e.preventDefault();
            let op = {
                'id': 0,
                'onClose': () => {
                    mThis.displayLevel();
                }
            };
            prepareLevel((html) => {
                level.html = html;
                level.show(op);
            });
        });

        mThis.tblLevel.on('click','a.btn-lvl-modify',function(e){
            e.preventDefault();
            let op = {
                'id': $(this).data('id'),
                'onClose': () => {
                    mThis.displayLevel();
                }
            };
            prepareLevel((html)=>{
                level.html = html;
                level.show(op);
            });
        });

        mThis.tblLevel.on('click','a.btn-lvl-delete',function(e){
            e.preventDefault();
            let op = {
                'id': $(this).data('id')
            };
            interact.confirm('Delete this level?',() => {
                api.postData('api/level/delete',op).then(res => {
                    if(res.status === 200){
                        mThis.displayLevel();
                    }
                });
            });
        });
    };

    this.displayLevel = (onFinish = null) => {
        api.getData('api/level/list').then(res => {
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
                title: "Program",
                data: "program"
            },
            {
                title: "Department",
                data: "department"
            },
            {
                title: "Action",
                data: (data, a, b) => {
                    return [`<div class="d-flex gap-2">
                        <a href="javascript:void(0)" class="btn-lvl-modify" data-id="${data.id}">
                            <i class="fa-regular fa-pen-to-square text-warning fs-5"></i>
                        </a>
                        <a href="javascript:void(0)" class="btn-lvl-delete" data-id="${data.id}">
                            <i class="fa-regular fa-trash-can text-danger fs-5"></i>
                        </a>
                    </div>`].join('');
                }
            }];

            if(mThis.table){
                mThis.tblLevel.DataTable().clear().destroy();
                mThis.tblLevel.empty();
                mThis.table = null;
            }

            if(!mThis.table){
                mThis.table = mThis.tblLevel.DataTable({
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
    };

    this.show = (options) => {
        if(!options) options = {};
        mThis.displayLevel(() => {
            main_view.setTitle(mThis.title_prop);
            mThis.self.show().siblings().hide();
        });
    };
};

let prepareLevel = (onFinish = null) => {
    let html = null, program = null, department = null;
    api.getData('api/book/get-options').then(res => {
        let d = {};
        if(res.status === 200){
            d = res.data;
        }

        html = [`<div class="form-group">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control data-input" data-field="name"/>
        </div>
        <div class="form-group mt-3">
            <label for="program_id" class="form-label">Program</label>
            <div class="width-select-in-form">
                <select class="modal-select2 data-input" data-field="program_id">
                    ${d && d.programs.map(option => {
                        program = [program,`<option value="${option.id}">${option.name}<option>`].join('');
                    }), program}
                </select>
            </div>
        </div>
        <div class="form-group mt-3">
            <label for="department_id" class="form-label">Department</label>
            <div class="width-select-in-form">
                <select class="modal-select2 data-input" data-field="department_id">
                    ${d && d.departments.map(option => {
                        department = [department,`<option value="${option.id}">${option.name}<option>`].join('');
                    }), department}
                </select>
            </div>
        </div>`].join('');

        if(typeof onFinish === 'function') onFinish(html);
    });
};

const level = new Modal({
    id: 'dlg_lvl_',
    title: 'Level',
    api_save: 'api/level/save',
    api_modify: 'api/level/details'
});

window.addEventListener('DOMContentLoaded',() => {
    LevelComponent.init();
});