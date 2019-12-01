const BASE_URL = 'http://localhost:3000';

export const PhonesServise = new class {
    constructor() {
        console.log('init PhonesServise');
    }

    async getAll({searchText, sortBy} = {}) {
        const phones = await this._sendRequest(`/phones/phones.json`);
        const searchPhones = this._search(phones, searchText);
        return this._sort(searchPhones, sortBy);

        // return new Promise((res, rej) => {
        //     const searchPhones = this._search(mockedPhones, searchText);
        //     const sorted = this._sort(searchPhones, sortBy);
        //     res(sorted);
        // });
    }

    getOneById(id) {
        return this._sendRequest(`/phones/${id}.json`);

        //example XMLHttpRequest
        // return new Promise((res, rej) => {
        //     const xhr = new XMLHttpRequest();
        //     xhr.open('GET', `/phones/${id}.json`);
        //     xhr.addEventListener('load', () => {
        //         if(xhr.status !== 200) {
        //             console.log(xhr.status, xhr.statusText);
        //             return rej(xhr.statusText);
        //         }
        //         res(JSON.parse(xhr.responseText));
        //     });
        //     xhr.send();
        // });

        //example fetch
        // return fetch(`/phones/${id}.json`)
        //     .then((res) => {
        //         if(res.status !== 200) {
        //             throw new Error(res.statusText);
        //         }
        //         return res.json();
        //     });
    }

    async _sendRequest(url, {method = "GET"} = {}) {
        const response = await fetch(`${BASE_URL}${url}`, {
            method,
            headers: [
                ['Content-type', 'application/json']
            ]
        });
        if(response.status !== 200) {
           throw new Error(response.statusText);
        }
        return response.json();
    }

    _search(phones, text) {
        if(!text) {
        return phones;
    }

        return phones.filter((phone) => {
            return phone.name.toLowerCase().includes(text.toLowerCase());
        });
    }

    _sort(phones, sortBy) {
        if(!sortBy) {
            return phones
        }

        phones.sort((phone1, phone2) => {
            if(phone1[sortBy] > phone2[sortBy]) {
                return 1;
            }
            if(phone1[sortBy] < phone2[sortBy]) {
                return -1;
            }
            return 0;
        });

        return phones;
    }

};