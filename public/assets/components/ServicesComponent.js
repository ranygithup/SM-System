'use strict';
var ServicesComponent = new function(){
    let mThis = this;
    this.title_prop = "Services";
    this.self = $('#_main_servicesComponent');

    this.btnNew = mThis.self.find('#_svc_btn_new');
    this.tblServices = mThis.self.find('#_svc_tbl');

    this.init = () => {
        mThis.btnNew.on('click',function(e){
            e.preventDefault();
            let op = {
                'id': 0,
                'onClose': () => {
                    mThis.displayServices();
                }
            }
            service.show(op);
        });

        mThis.tblServices.on('click','a.btn-svc-modify',function(e){
            e.preventDefault();
            let op = {
                'id': $(this).data('id'),
                'onClose': () => {
                    mThis.displayServices();
                }
            };
            service.show(op);
        });

        mThis.tblServices.on('click','a.btn-svc-delete',function(e){
            e.preventDefault();
            let op = {
                'id': $(this).data('id')
            };
            interact.confirm('Delete this service?',() => {
                api.postData('api/service/delete',op).then(res => {
                    if(res.status === 200){
                        mThis.displayServices();
                    }
                });
            });
        });
    }

    this.displayServices = (onFinish = null) => {
        api.getData('api/service/list').then(res => {
            let data = [];
            if(res.status === 200){
                data = res.data;
            }

            let cols = [{
                title: "Name",
                data: "name"
            },
            {
                title:"Date",
                data: "created_at"
            },
            {
                title: "Action",
                data: (data, a, b) => {
                    return [`<div class="d-flex gap-2">
                        <a href="javascript:void(0)" class="btn-svc-modify" data-id="${data.id}">
                            <i class="fa-regular fa-pen-to-square text-warning fs-5"></i>
                        </a>
                        <a href="javascript:void(0)" class="btn-svc-delete" data-id="${data.id}">
                            <i class="fa-regular fa-trash-can text-danger fs-5"></i>
                        </a>
                    </div>`].join('');
                }
            }];

            if(mThis.table){
                mThis.tblServices.DataTable().clear().destroy();
                mThis.tblServices.empty();
                mThis.table = null;
            }

            if(!mThis.table){
                mThis.table = mThis.tblServices.DataTable({
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
        mThis.displayServices(() => {
            main_view.setTitle(mThis.title_prop);
            mThis.self.show().siblings().hide();
        });
    }
}

let html = [`<div class="form-group">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control data-input" data-field="name"/>
</div>`].join('');

const service = new Modal({
    id: "dlg_svc_",
    title: "Service",
    html: html,
    api_save: "api/service/save",
    api_modify: "api/service/details"
});

window.addEventListener('DOMContentLoaded',() => {
    ServicesComponent.init();
});