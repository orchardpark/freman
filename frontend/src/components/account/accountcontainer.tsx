import React, { useEffect } from 'react'
import { getEndPoint, getGetRequestOptions } from '../app/util'
import AccountData from './accountdata'
import AccountContainerDisplay from './accountcontainerdisplay'
type Props = {
    token: string
    setToken: (token: string) => void
}
function AccountContainer({ token, setToken }: Props) {
    const [accountData, setAccountData] = React.useState<AccountData>()
    const getAccountData = () => {
        const request = getEndPoint('account')
        const requestOptions = getGetRequestOptions(token)
        fetch(request, requestOptions)
            .then(data => data.json())
            .then(data => setAccountData(data))
            .catch(console.log)
    }

    useEffect(getAccountData, [token, setToken])

    return (
        <AccountContainerDisplay name={accountData?.name} createdDate={accountData?.created_at} />
    )
}

export default AccountContainer