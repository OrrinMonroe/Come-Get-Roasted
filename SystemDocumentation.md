# System Requirements
    Install Flyway and take a note of the file path to the "flyway-#.#.#" file.

    Install VSCode for your IDE. Make sure to allow the Java dependencies to install so that you can use Spring Boot.

    Install the Live Server extension from Ritwick Dey. 

    In the live server home page, click on the Settings gear and select "Extension Settings."

    Scroll down to "Live Server > Settings:Ignore Files" and click on "Edit in settings.json."

    In the settings.json file, change the liveserver.settings.ignore fline to the following:

                "liveServer.settings.ignoreFiles": [
                    "**/**"
                ],

    Have a Web Browser of your choice installed.

    In the ./run_flyway.cmd file, set the FLYWAY_HOME variable to point to the location of the Flyway install you noted earlier.
    
## Start Up Process
    In the Command Line Run ./run_flyway.cmd clean baseline migrate info 
    to set up the database.
  ![flyway](/CGR-ScreenShots/flyway.PNG "flyway")
  

    Run Application.java in your IDE.
![runApp](/CGR-ScreenShots/runApp.png "runApp")

    Navigate to the index.html file.
    Click on the "Go Live" button in the lower-right corner of VSCode to launch the live website.

