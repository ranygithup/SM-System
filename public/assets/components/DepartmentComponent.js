'use strict';
var DepartmentComponent = new function(){
    let mThis = this;
    this.title_prop = "Department";
    this.self = $('#_main_departmentComponent');

    this.tblDepartment = mThis.self.find('#_dpm_tbl');
    this.btnNew = mThis.self.find('#_dpm_btn_new');

    this.init = () => {
        mThis.btnNew.on('click',function(e){
            e.preventDefault();
            let op = {
                'id': 0,
                'onClose': () => {
                    mThis.displayDepartment();
                }
            };
            department.show(op);
        });

        mThis.tblDepartment.on('click','a.btn-dpm-modify',function(e){
            e.preventDefault();
            let op = {
                'id': $(this).data('id'),
                'onClose': () => {
                    mThis.displayDepartment();
                }
            };
            department.show(op);
        });

        mThis.tblDepartment.on('click','a.btn-dpm-delete',function(e){
            e.preventDefault();
            let op = {
                'id': $(this).data('id')
            };
            interact.confirm('Delete this department?', () => {
                api.postData('api/department/delete', op).then(res => {
                    if(res.status === 200){
                        mThis.displayDepartment();
                    }
                });
            });
        });
    }

    this.displayDepartment = (onFinish = null) => {
        api.getData('api/department/list').then(res => {
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
                title: "Created",
                data: "created_at"
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
                mThis.tblDepartment.DataTable().clear().destroy();
                mThis.tblDepartment.empty();
                mThis.table = null;
            }
            
            if(!mThis.table){
                mThis.table = mThis.tblDepartment.DataTable({
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
            };

            if(typeof onFinish === 'function') onFinish();
        });
    }

    this.show = (options) => {
        if(!options) options = {};
        mThis.displayDepartment(() => {
            main_view.setTitle(mThis.title_prop);
            mThis.self.show().siblings().hide();
        });
    }
}

const department = new Modal({
    id: 'dlg_dpm',
    title: "Department",
    api_save: 'api/department/save',
    api_modify: 'api/department/details',
    html: [`<div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control data-input" data-field="name"/>
    </div>`].join('')
});

window.addEventListener('DOMContentLoaded', () => {
    DepartmentComponent.init();
});