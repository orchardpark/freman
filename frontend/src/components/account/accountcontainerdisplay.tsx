import '../container.css'
import { Col, Button, Container, Row } from 'react-bootstrap'

type Props = {
    name: string,
    createdDate: string,
    token: string,
    getAPIToken: () => void
}

function AccountContainerDisplay({ name, createdDate, token, getAPIToken }: Props) {
    let tokenDisplay;
    if (token === '') {
        tokenDisplay = <p>Click button to generate new API token for the logger application</p>
    }
    else {
        tokenDisplay =
            <>
                <p>Copy token below and set it according to the instructions in the Download tab.</p>
                <p style={{ color: 'red' }}>{token}</p>
            </>
    }
    return (

        <Container>
            <Row><h1>Account</h1></Row>
            <Row>Account: {name}</Row>
            <Row>Created: {createdDate}</Row>
            <Row>
                Token:
                <Col xs={1}>
                    <Button onClick={getAPIToken}>
                        Generate
                    </Button>
                </Col>
                <Col xs={3}>
                    {tokenDisplay}
                </Col>
            </Row>
            <Row>
                Problems or suggestions? Post them on
                <a href='https://github.com/orchardpark/freman/issues'>&nbsp;Github</a>
            </Row>
        </Container>
    )
}

export default AccountContainerDisplay