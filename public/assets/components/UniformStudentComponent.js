'use strict';
var UniformStudentComponent = new function(){
    let mThis = this;
    this.title_prop = "Uniform Student";
    this.self = $('#_main_ufm_StudentComponent');

    this.tblUniformStudent = mThis.self.find('#_ufsd_tbl');
    this.btnNew = mThis.self.find('#_ufsd_btn_new');

    this.init = () => {
        mThis.btnNew.on('click',function(e){
            e.preventDefault();
            let op = {
                'id': 0,
                'onClose': () => {
                    mThis.displayUniformStudent();
                }
            };
            uniformStudent.show(op);
        });

        mThis.tblUniformStudent.on('click','a.btn-nfsd-modify',function(e){
            e.preventDefault();
            let op = {
                'id': $(this).data('id'),
                'onClose': () => {
                    mThis.displayUniformStudent();
                }
            };
            uniformStudent.show(op);
        });

        mThis.tblUniformStudent.on('click','a.btn-nfsd-delete',function(e){
            e.preventDefault();
            let op = {
                'id': $(this).data('id')
            };
            interact.confirm('Delete this uniform student?',() => {
                api.postData('api/uniform-student/delete',op).then(res => {
                    if(res.status === 200){
                        mThis.displayUniformStudent();
                    }
                });
            });
        });
    }

    this.displayUniformStudent = (onFinish = null) => {
        api.getData('api/uniform-student/list').then(res => {
            let data = [];
            if(res.status === 200){
                data = res.data;
            }

            let cols = [{
                title: "Photo",
                data: (data, a, b) => {
                    let image = data.image_url ? data.image_url : '';
                    return [`<img class="tbl-image" src="${image}" alt=""/>`].join('');
                }
            },
            {
                title: "Sex",
                data: "sex"
            },
            {
                title: "Description",
                data: "description"
            },
            {
                title:"Action",
                data: (data, a, b) => {
                    return [`<div class="d-flex gap-2">
                        <a href="javascript:void(0)" class="btn-nfsd-modify" data-id="${data.id}">
                            <i class="fa-regular fa-pen-to-square text-warning fs-5"></i>
                        </a>
                        <a href="javascript:void(0)" class="btn-nfsd-delete" data-id="${data.id}">
                            <i class="fa-regular fa-trash-can text-danger fs-5"></i>
                        </a>
                    </div>`].join('');
                }
            }];

            if(mThis.table){
                mThis.tblUniformStudent.DataTable().clear().destroy();
                mThis.tblUniformStudent.empty();
                mThis.table = null;
            }

            if(!mThis.table){
                mThis.table = mThis.tblUniformStudent.DataTable({
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
        mThis.displayUniformStudent(() => {
            main_view.setTitle(mThis.title_prop);
            mThis.self.show().siblings().hide();
        });
    }
}

const uniformStudent = new Modal({
    id: 'dlg_ufsd_',
    title: 'Uniform Student',
    class_name: 'modal-lg',
    image: 'ufsd_dlg_empty',
    html: [`<div class="row gy-2">
        <div class="col-lg-4">
            <div class="bok-dlg-image">
                <div id="ufsd_dlg_empty" class="bok-dlg-image-empty">
                    <i class="fa-regular fa-image text-muted fs-3"></i>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="form-group">
                <label for="sex" class="form-label">Sex</label>
                <div class="width-select-in-form">
                    <select class="modal-select2 data-input" data-field="sex">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>
            <div class="form-group mt-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control data-input" data-field="description"></textarea>
            </div>
        </div>
    </div>`].join(''),
    api_save: 'api/uniform-student/save',
    api_modify: 'api/uniform-student/details'
});

window.addEventListener('DOMContentLoaded',() => {
    UniformStudentComponent.init();
});