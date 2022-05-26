import config from "../app/config"

/**
 * @param func The function to be called
 * @param queryParams A map of the parameters and corresponding values.
 * @returns The endpoint corresponding to given function (e.g. logged) 
 */
const getEndPoint = (func: string, queryParams: { [param: string]: string } = {}, version = "/v1") => {
    var paramArray = new Array<String>()
    for (const key in queryParams) {
        paramArray.push(key + '=' + queryParams[key])
    }
    if (paramArray.length === 0) {
        const request =
            config.protocol + '://' + config.serverURL + ":" + config.serverPort + version + "/" + func
        return request
    }
    else {
        const paramString = '?' + paramArray.join('&')
        const request =
            config.protocol + '://' + config.serverURL + ":" + config.serverPort + version + "/" + func + paramString
        return request
    }
}

const getPostRequestOptions = (token: string, body: string) => {
    return {
        body: body,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        method: 'POST'
    }
}

const getGetRequestOptions = (token: string) => {
    return {
        headers: { 'Authorization': 'Bearer ' + token }
    }
}

export { getEndPoint, getPostRequestOptions, getGetRequestOptions }
