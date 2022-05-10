import React from 'react'
import {Button} from 'react-bootstrap'
import "../container.css"
import linuxInstruction from './instruction'

type Props = {
    platform: string,
}

function DownloadContainerDisplay({ platform}: Props) {
    const downloadLink = "robots.txt"

    const instructionText = (platform: string) => {
        if(platform === "Linux"){
            return linuxInstruction
        }
        else{
            return ""
        }
    }
    return (
        <div className="container">
            <div>
                <h1>Desktop Logging Software</h1>
            </div>
            <div style={{
                maxWidth: "600px",
                 width: "600px",
                  marginBottom:"60px",
                  marginTop:"20px"
                }}>
                {instructionText(platform)}
            </div>
            <div>
                <Button variant="primary" size="lg" href={downloadLink} >Download</Button>
            </div>
        </div>
    )
}

export default DownloadContainerDisplay