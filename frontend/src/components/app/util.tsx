import config from "../app/config"

/**
 * @param func The function to be called
 * @param queryParams A map of the parameters and corresponding values.
 * @returns The endpoint corresponding to given function (e.g. logged) 
 */
const getEndPoint = (func: string, queryParams: { [param: string]: string } = {}) => {
    var paramArray = new Array<String>()
    for (const key in queryParams) {
        paramArray.push(key + '=' + queryParams[key])
    }
    if (paramArray.length === 0) {
        const request = config.protocol + '://' + config.serverURL + ":" + config.serverPort + "/" + func
        return request
    }
    else {
        const paramString = '?' + paramArray.join('&')
        const request = config.protocol + '://' + config.serverURL + ":" + config.serverPort + "/" + func + paramString
        return request
    }
}

export { getEndPoint }
