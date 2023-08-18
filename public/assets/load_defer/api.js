class API{
    async getData(apiUrl) {
        let api = [document.location.origin, apiUrl].join('/');
        let token = this.getToken();
        const response = await fetch(api,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }

    async postData(apiUrl, payLoad){
        let api = [document.location.origin, apiUrl].join('/');
        let token = this.getToken();
        console.log(token);
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payLoad)
        });
        const data = await response.json();
        return data;
    };

    getCookie = (name) => {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    getToken = () => {
        let token = document.head.querySelector('meta[name="csrf-token"]').content;
        return token;
    }
};

const api = new API();