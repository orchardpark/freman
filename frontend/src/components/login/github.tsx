import React from 'react'
import { useSearchParams } from 'react-router-dom';
import config from '../app/config'
import { format } from 'react-string-format';
import { getEndPoint } from '../app/util';

function GithubLogin() {
    const githubClientId = config.githubClientId
    const link = format('https://github.com/login/oauth/authorize?client_id={0}',
        githubClientId)

    return (
        <a href={link}>Login with Github</a>
    )
}

type Props = {
    setToken: (token: string) => void,
}

function GithubRedirect({ setToken }: Props) {
    const [success, setSuccess] = React.useState(false)
    const [searchParams] = useSearchParams();
    const getRequest = () => {
        if (searchParams.has('code')) {
            const code = searchParams.get('code')!
            const request = getEndPoint('github_login', { 'code': code })
            fetch(request)
                .then((data) => {
                    return data.json()
                }
                )
                .then(data => {
                    console.log('token returned ' + data)
                    setToken(data)

                })
                .then(() => { setSuccess(true) })
                .catch(console.log)
        }
        if (success) {
            return 'Login succeeded'
        }
        else {
            setToken('')
            return 'Login...'
        }
    }

    return (
        <div>
            {getRequest()}
        </div>
    )
}

export { GithubLogin, GithubRedirect }