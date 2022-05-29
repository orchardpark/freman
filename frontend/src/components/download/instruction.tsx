const linuxInstruction =
    <div>
        <div>
            In order to track the time you spend on application, the desktop logging software is needed.
            You can get the software by clicking the download button below.
            The software needs to be running in order to log time spend on applications.
            If you want to automatically run the program, you can use your OS's built-in task scheduler.
        </div>
        <br />
        <div>
            <h5>Detected Operating System: Linux</h5>
            <h2>Installation instructions. </h2>
            <ol>
                <li>Download and unzip the archive.</li>
                <li>Obtain an API key in the `Account` tab</li>
                <li>Open a terminal and navigate to the extracted folder.</li>
                <li>Run: <code>chmod +x distro_installer.sh</code>, replace distro by your linux distribution (e.g. ubuntu).</li>
                <li>Run: <code>sudo ./distro_installer.sh</code> and follow the instructions.</li>
                <li>Move into the logger directory <code>cd logger</code></li>
                <li>Run the program by running: <code>./logger</code></li>
                <li>Optional: use a tool like <code>cron</code> to schedule fremanlogger to run on startup.</li>
            </ol>
            <h2>Alternative instructions. </h2>
            <ol>
                <li>Download the logger from github and configure it to run with https://freman.pro</li>
            </ol>
        </div>
    </div>

const windowsInstruction =
    <div>
        <div>
            In order to track the time you spend on application, the desktop logging software is needed.
            You can get the software by clicking the download button below.
            The software needs to be running in order to log time spend on applications.
            If you want to automatically run the program, you can use your OS's built-in task scheduler.
        </div>
        <br />
        <div>
            <h5>Detected Operating System: Windows</h5>
            <h2>Installation instructions. </h2>
            <ol>
                <li>Download the archive and unzip it.</li>
                <li>Obtain an API key in the `Account` tab</li>
                <li>Open the unzipped folder and run the windows_install.exe. The code is unsigned, so you will need to accept.</li>
                <li>Wait for the installer to finish and open the logger folder.</li>
                <li>Run the logger.exe program. Again, accept running the unsigend executable.</li>
                <li>Optional: schedule the logger.exe to run with Windows Task Scheduler.</li>
            </ol>
            <h2>Alternative instructions. </h2>
            <ol>
                <li>Download the logger from github and configure it to run with https://freman.pro</li>
            </ol>
        </div>
    </div>

export {
    linuxInstruction,
    windowsInstruction
}