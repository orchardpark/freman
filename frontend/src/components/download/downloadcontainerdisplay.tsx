import { Button } from 'react-bootstrap'
import { linuxInstruction, windowsInstruction } from './instruction'
import { Container, Row } from 'react-bootstrap'
import "../container.css"

type Props = {
    platform: string,
}

function DownloadContainerDisplay({ platform }: Props) {
    const downloadLink = () => {
        if (platform === "Linux") {
            return "linux_installer.zip"
        }
        else if (platform === "Windows") {
            return "logger_installer.exe"
        }
        else {
            return ""
        }
    }

    const instructionText = (platform: string) => {
        if (platform === "Linux") {
            return linuxInstruction
        }
        else if (platform === "Windows") {
            return windowsInstruction
        }
        else {
            return ""
        }
    }
    return (
        <Container>
            <Row>
                <h1>Desktop Logging Software</h1>
            </Row>
            <Row style={{
                maxWidth: "600px",
                width: "600px",
                marginBottom: "60px",
                marginTop: "20px"
            }}>
                {instructionText(platform)}
            </Row>
            <Row>
                <Button variant="primary" size="lg" href={downloadLink()} >Download</Button>
            </Row>
        </Container>
    )
}

export default DownloadContainerDisplay