import '../container.css'
import { Col, Button, Container, Row } from 'react-bootstrap'

type Props = {
    name: string | undefined,
    createdDate: Date | undefined,
    token: string,
    getAPIToken: () => void
}

function AccountContainerDisplay({ name, createdDate, token, getAPIToken }: Props) {
    let tokenDisplay;
    if (token === '') {
        tokenDisplay = <p>Click button to generate new API token for the logger application</p>
    }
    else {
        tokenDisplay = <p>Token= {token} Copy it and set it according to the instructions in the Download tab.</p>
    }
    return (

        <Container>
            <Row><h1>Account</h1></Row>
            <Row>Account {name}</Row>
            <Row>Created {createdDate}</Row>
            <Row>
                <Col xs={1}>
                    <Button onClick={getAPIToken}>
                        Generate
                    </Button>
                </Col>
                <Col xs={3}>
                    {tokenDisplay}
                </Col>
            </Row>
        </Container>
    )
}

export default AccountContainerDisplay