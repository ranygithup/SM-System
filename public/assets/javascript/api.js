class API{
    async getData(apiUrl) {
        let api = [document.baseURI, apiUrl].join('');
        const response = await fetch(api,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    }

    async postData(apiUrl, payLoad){
        let api = [document.baseURI, apiUrl].join('');
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payLoad)
        });
        const data = await response.json();
        return data;
    }
}

const api = new API();