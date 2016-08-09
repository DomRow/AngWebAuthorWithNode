# AngularWebAuthor
A web authoring tool that allows re-construction of pages from JSON.

## Setup - Node & MongoDB
These are downloadable from their respective websites - a little bit of setup time is required.
Install NodeJs on your system - "C:/node" is the usual directory.
Install MongoDB on your system - "C:/mongo" is the usual directory.
Then download the zip file or clone this repository to a directory of your choice.

Once these steps are completed, open a command line window and change directory to where the project is located.

$ cd C:/myProjects/AngWebAuthorWithNode-master

Once this is done, tell the Node package manager (npm) to install the requirements listed in the package.json file

$ npm install -r package.json --save

Now that the project and it's dependencies are installed, open a second command window and change directory to where mongo is installed, and then to the binaries folder:

$ cd c:/mongo/bin

Once this is done, the database location needs to be set. Create a folder somewhere called "data", and tell mongo to use this as it's storage location with this command:

$ mongod --dbpath C:\Users\user\Desktop\data

After setting this, the mongo server will automatically start (See note about cmd.bat at the end of this Readme)
This folder does not need to be located in the project directory, but do so if it suits tidyness requirements.

Then open a third command line window and change directory to the project location. This command will start the server on port 8090:

$ nodemon server.js

Proceed to localhost:8090 to view the homepage.

##Command Batch File

To speed up the process of starting the project at each launch, create a command line shortcut on your desktop. Copy the "mycmd.bat" file to your desktop also so that it can be read by the command line shortcut. To add this file to your command line, right -click on the command line shortcut and click "properties". Add

"/K C:\Desktop\mycmd.bat" 

To the END of the "target" line to add the batch file to the shortcut. This allows the shortcuts listed below to be used in any instance of the shortcut.

#Shorcut commands are triggered by typing the corresponding number:

DOSKEY 1=cd..
DOSKEY 2=nodemon server.js
DOSKEY 3=cd C:\mongo\bin
DOSKEY 4=mongod --dbpath C:\Users\user\Desktop\data
DOSKEY 5=mongo.exe
DOSKEY 6=rs 
DOSKEY 7=^C
DOSKEY 8=exit

So when opening a window to use as the mongodb server, open an instance of the shortcut with the new target and press:
"3" and press enter, then:
"4" and press enter. 

This will quickly change directory and set then dbpath and start the server.
Then open another instance of the same command line (right click on cmd on the startbar and click "cmd -Shortcut" to open another)
type "2" and press enter to start the node server.
Proceed to the localhost address:
"localhost:8090"
