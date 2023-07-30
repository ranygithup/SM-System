class FileChooser{
    createInput = (callback) => {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        document.body.appendChild(input);

        input.addEventListener('change',(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = function(e){
                const dataURL = e.target.result;
                callback && callback(dataURL);
            }
            reader.readAsDataURL(file);
        });

        input.click();
        input.remove();
    }

    chooseFile = (callback) => {
        this.createInput((base64) => {
            callback && callback(base64);
        });
    }
}
const file = new FileChooser();