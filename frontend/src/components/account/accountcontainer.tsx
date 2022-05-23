import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { getEndPoint, getGetRequestOptions } from '../app/util'
import AccountData from './accountdata'
import '../container.css'
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
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    setToken('')
                }
            }).then(data => setAccountData(data)).catch(console.log)
    }

    useEffect(getAccountData, [token, setToken])

    return (
        <Container>
            <Row>Account {accountData?.name}</Row>
            <Row>Created {accountData?.created_at}</Row>
        </Container>
    )
}

export default AccountContainer