'use strict';
var CertificateComponent = new function(){
    let mThis = this;
    this.title_prop = "Certificate";
    this.self = $('#_main_certificateComponent');

    this.tblCertificte = mThis.self.find('#_ctf_tbl');

    this.init = () => {}

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
                    return [`<img class="" src="${image}" alt=""/>`].join('');
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
    }

    this.show = (options) => {
        if(!options) options = {};
        mThis.displayCertificate(() => {
            main_view.setTitle(mThis.title_prop);
            mThis.self.show().siblings().hide();
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    CertificateComponent.init();
});