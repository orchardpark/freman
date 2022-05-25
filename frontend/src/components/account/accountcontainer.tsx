import React, { useEffect } from 'react'
import { getEndPoint, getGetRequestOptions } from '../app/util'
import AccountData from './accountdata'
import AccountContainerDisplay from './accountcontainerdisplay'
type Props = {
    token: string
    handleFetchError: (error: Error) => void
}

function AccountContainer({ token, handleFetchError }: Props) {
    const [accountData, setAccountData] = React.useState<AccountData>({ name: "sdd", created_at: "fuck" })
    const [APIToken, setAPIToken] = React.useState<string>("")
    const getAccountData = () => {
        const request = getEndPoint('account')
        const requestOptions = getGetRequestOptions(token)
        fetch(request, requestOptions)
            .then(data => data.json())
            .then(data => setAccountData(data))
    }
    const getAPIToken = () => {
        const request = getEndPoint('request_api_token')
        const requestOptions = getGetRequestOptions(token)
        fetch(request, requestOptions)
            .then(data => data.json())
            .then(data => setAPIToken(data))
            .catch(handleFetchError)
    }

    useEffect(getAccountData, [token])

    return (
        <AccountContainerDisplay
            name={accountData.name}
            createdDate={accountData.created_at.split('T')[0]}
            token={APIToken}
            getAPIToken={getAPIToken}
        />
    )
}

export default AccountContainer