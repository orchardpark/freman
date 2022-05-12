import DownloadContainerDisplay from "./downloadcontainerdisplay"
function DownloadContainer() {

    const getPlatform = () => {
        var OSName = "Unknown";
        if (window.navigator.userAgent.indexOf("Windows") !== -1) OSName = "Windows";
        if (window.navigator.userAgent.indexOf("Mac") !== -1) OSName = "Mac";
        if (window.navigator.userAgent.indexOf("X11") !== -1) OSName = "UNIX";
        if (window.navigator.userAgent.indexOf("Linux") !== -1) OSName = "Linux";
        return OSName
    }
    return (
        <DownloadContainerDisplay platform={getPlatform()}/>
    )
}

export default DownloadContainer