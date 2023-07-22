class API{
    async getData(apiUrl) {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    }

    async postData(apiUrl, payLoad){
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(payLoad),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    }
}

var api = new API();