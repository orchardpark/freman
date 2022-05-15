import config from "../app/config"

/**
 * @param func
 * @returns The endpoint corresponding to given function (e.g. logged) 
 */
const getEndPoint = (func: string) => {
    const request = config.protocol + '://' + config.serverURL + ":" + config.serverPort + "/" + func
    return request
}

export { getEndPoint }
