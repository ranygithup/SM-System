'use strict';
var CertificateComponent = new function(){
    let mThis = this;
    this.title_prop = "Certificate";
    this.self = $('#_main_certificateComponent');

    this.tblCertificte = mThis.self.find('#_ctf_tbl');
    this.btnNew = mThis.self.find('#_ctf_btn_new');

    this.init = () => {
        mThis.btnNew.on('click',function(e){
            e.preventDefault();
            let op = {
                'id': 0,
                'onClose': () => {
                    mThis.displayCertificate();
                }
            };
            certificate.show(op);
        });

        mThis.tblCertificte.on('click','a.btn-ctf-modify',function(e){
            e.preventDefault();
            let op = {
                'id': $(this).data('id'),
                'onClose': () => {
                    mThis.displayCertificate();
                }
            };
            certificate.show(op);
        });

        mThis.tblCertificte.on('click','a.btn-ctf-delete',function(e){
            e.preventDefault();
            let op = {
                'id': $(this).data('id')
            };
            interact.confirm('Delete this certificate?',() => {
                api.postData('api/certificate/delete',op).then(res => {
                    if(res.status === 200){
                        mThis.displayCertificate();
                    }
                });
            });
        });
    };

    this.displayCertificate = (onFinish = null) => {
        api.getData('api/certificate/list').then(res => {
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
                title: "Description",
                data: "description"
            },
            {
                title: "Action",
                data: (data, a, b) => {
                    return [`<div class="d-flex gap-2">
                        <a href="javascript:void(0)" class="btn-ctf-modify" data-id="${data.id}">
                            <i class="fa-regular fa-pen-to-square text-warning fs-5"></i>
                        </a>
                        <a href="javascript:void(0)" class="btn-ctf-delete" data-id="${data.id}">
                            <i class="fa-regular fa-trash-can text-danger fs-5"></i>
                        </a>
                    </div>`].join('');
                }
            }];

            if(mThis.table){
                mThis.tblCertificte.DataTable().clear().destroy();
                mThis.tblCertificte.empty();
                mThis.table = null;
            }

            if(!mThis.table){
                mThis.table = mThis.tblCertificte.DataTable({
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
        mThis.displayCertificate(() => {
            main_view.setTitle(mThis.title_prop);
            mThis.self.show().siblings().hide();
        });
    };
};

const certificate = new Modal({
    id: 'dlg_ctf_',
    title: 'Certificate',
    class_name: 'modal-lg',
    html: [`<div class="row gy-2">
        <div class="col-lg-4">
            <div class="bok-dlg-image">
                <div id="ctf_dlg_empty" class="bok-dlg-image-empty">
                    <i class="fa-regular fa-image text-muted fs-3"></i>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="form-group">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control data-input" data-field="name"/>
            </div>
            <div class="form-group mt-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control data-input" data-field="description"></textarea>
            </div>
        </div>
    </div>`].join(''),
    image: 'ctf_dlg_empty',
    api_save: 'api/certificate/save',
    api_modify: 'api/certificate/details'
});

window.addEventListener('DOMContentLoaded',() => {
    CertificateComponent.init();
});