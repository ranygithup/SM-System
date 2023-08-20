class API{
    async getData(apiUrl){
        let api = [document.location.origin, apiUrl].join('/');
        let token = this.getCookie('darasmschool');
        const res = await fetch(api,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        
        switch(res['status']){
            case 200:
                return data;
            case 401:
                window.location.href = '/';
                break;
            case 500:
                console.error(data.status+' Internal Server Error!');
                break;
            default:
                break;
        };
    };

    async postData(apiUrl, payLoad){
        let api = [document.location.origin, apiUrl].join('/');
        let token = this.getCookie('darasmschool');
        const res = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payLoad)
        });
        const data = await res.json();

        switch(res['status']){
            case 200:
                return data;
            case 401:
                window.location.href = '/';
                break;
            case 500:
                console.error(data.status+' Internal Server Error!');
                break;
            default:
                break;
        };
    };

    getCookie = (name) => {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };
};

const api = new API();