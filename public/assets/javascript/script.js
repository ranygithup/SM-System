class Modal{
    constructor(option={
        'id': id,
        'title': title,
        'class_name': class_name
    }){
        this.id = option.id;
        this.title = option.title;
        this.class_name = option.class_name,
        this.renderModal();
    }

    renderModal = () => {
        let modal = document.createElement('div');
        modal.setAttribute('id', this.id);
        modal.setAttribute('class','modal fade');
        modal.setAttribute('tabindex','-1');
        modal.setAttribute('aria-labelledby',this.id+'_title');
        modal.setAttribute('aria-hidden',true);
        document.body.appendChild(modal);

        let modal_dialog = document.createElement('div');
        modal_dialog.setAttribute('class',this.class_name ? this.class_name : 'modal-dialog');
        modal.appendChild(modal_dialog);

        let modal_content = document.createElement('div');
        modal_content.setAttribute('class','modal-content');
        modal_dialog.appendChild(modal_content);
        
        this.hadleHeader(modal_content);
        this.handleBody(modal_content);
        this.handleFooter(modal_content);
    }

    hadleHeader = (modal_content) => {
        let modal_header = document.createElement('div');
        modal_header.setAttribute('class','modal-header');
        modal_content.appendChild(modal_header);

        let modal_title = document.createElement('h4');
        modal_title.setAttribute('class','modal-title');
        modal_title.textContent = this.title;
        modal_header.appendChild(modal_title);
    }

    handleBody = (modal_content) => {
        let modal_body = document.createElement('div');
        modal_body.setAttribute('class','modal-body');
        modal_content.appendChild(modal_body);

        let row = document.createElement('div');
        row.setAttribute('class','row');
        modal_body.appendChild(row);
    }

    handleFooter = (modal_content) => {
        let modal_footer = document.createElement('div');
        modal_footer.setAttribute('class','modal-footer');
        modal_content.appendChild(modal_footer);

        let button_cancel = document.createElement('button');
        button_cancel.setAttribute('class','btn btn-secondary');
        button_cancel.setAttribute('type','button');
        button_cancel.setAttribute('data-dismiss','modal');
        button_cancel.textContent = "Cancel";
        modal_footer.appendChild(button_cancel);

        let button_save = document.createElement('button');
        button_save.setAttribute('class','btn btn-primary');
        button_save.setAttribute('type','button');
        button_save.textContent = "Save";
        modal_footer.appendChild(button_save);
    }

    show = () => {
        let modal = document.getElementById(this.id);
        modal.classList.add('show');
        modal.style.display = 'block';
    }
}

let test = new Modal({
    id: 'invoice',
    title: 'Test',
    class_name: 'modal-dialog modal-lg'
});