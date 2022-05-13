const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const dev= {
    serverURL: '127.0.0.1',
    serverPort: 5000,
    protocol: 'http'
}

const prd = {
    serverURL: '127.0.0.1',
    serverPort: 5000,
    protocol: 'http'
}

const isDev = () => {
    return development;
}

const config = isDev() ? dev : prd

export default config