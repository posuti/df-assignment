interface FetchParams {
    endpoint: string,
    method: string,
    payload?: any
}

const API_URL = process.env.REACT_APP_API_URL;

export default class ItemsApi {

    private static callApi(params: FetchParams) {
        const { endpoint, method, payload } = params;

        let reqParams: any = {
            method: method
        }

        if (method === "POST") {
            reqParams = {
                ...reqParams,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        }

        return new Promise((resolve, reject) => {
            fetch(`${API_URL}/${endpoint}`, reqParams).then(function (res) {
                res.json().then((json) => {
                    resolve(json);
                }).catch((err) => reject({ status: "error" }))
            })
        });

    }

    public static GetAllItems() {
        return this.callApi({
            endpoint: "getAll",
            method: 'GET'
        })
    }

    public static AddItem(item: any) {
        return this.callApi({
            endpoint: 'create',
            method: 'POST',
            payload: item
        })
    }

    public static DeleteItem(item: any) {
        return this.callApi({
            endpoint: 'delete',
            method: 'POST',
            payload: item
        })
    }

}
