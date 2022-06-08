import React, { useEffect } from 'react'
import { getEndPoint, getGetRequestOptions } from '../app/util'
import AccountData from './accountdata'
import AccountContainerDisplay from './accountcontainerdisplay'
type Props = {
    token: string
    handleFetchError: (error: Error) => void,
    logOut: () => void
}

function AccountContainer({ token, handleFetchError, logOut }: Props) {
    const [accountData, setAccountData] = React.useState<AccountData>({ name: "", created_at: "" })
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

    const getCreatedDate = () => {
        if (accountData.created_at === undefined) return ""
        else return accountData.created_at.split('T')[0]
    }

    useEffect(getAccountData, [token])

    return (
        <AccountContainerDisplay
            name={accountData.name}
            createdDate={getCreatedDate()}
            token={APIToken}
            getAPIToken={getAPIToken}
            logOut={logOut}
        />
    )
}

export default AccountContainer