import '../container.css'
import { Container, Row } from 'react-bootstrap'

type Props = {
    name: string | undefined,
    createdDate: Date | undefined
}

function AccountContainerDisplay({ name, createdDate }: Props) {
    return (

        <Container>
            <Row><h1>Account</h1></Row>
            <Row>Account {name}</Row>
            <Row>Created {createdDate}</Row>
        </Container>
    )
}

export default AccountContainerDisplay