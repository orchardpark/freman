import React from 'react'
import { useSearchParams } from 'react-router-dom';
import config from '../app/config'
import { format } from 'react-string-format';
import { getEndPoint } from '../app/util';

function GithubLogin() {
    const githubClientId = config.githubClientId
    const link = format('https://github.com/login/oauth/authorize?client_id={0}', githubClientId)

    return (
        <a href={link}>Login with Github</a>
    )
}

function GithubRedirect() {
    const [searchParams, setSearchParams] = useSearchParams();
    const request = getEndPoint('access_token')

    return (
        <div>
            {searchParams.get('code')}
        </div>
    )
}

export { GithubLogin, GithubRedirect }