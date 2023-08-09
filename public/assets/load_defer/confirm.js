class Interact{
    __constructor(){}

    confirm = (title, callback=null) => {
        Swal.fire({
            title: title,
            icon: 'question',
            iconHtml: '؟',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
            showCloseButton: true
        }).then((result) => {
            if(result.isConfirmed){
                callback && callback(); 
            }
        });
    }
}

const interact = new Interact();