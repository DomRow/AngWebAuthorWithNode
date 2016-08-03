# AngularWebAuthor
A web authoring tool that allows re-construction of pages from JSON.

## Setup
First download the zip file or clone this repository to a directory of your choice.
Install NodeJs on your system.
Install MongoDB on your system.

Open a command line window and change directory to where the project is located.

$ cd C:/myProjects/AngWebAuthorWithNode

Once this is done, tell the Node package manager (npm) to install the requirements listed in the package.json file

$ npm install -r package.json --save

Now the project and it's dependencies are installed. Open a second command window and change directory to where mongo is installed, and then to the binaries folder:

$ cd c:/mongo/bin

Once this is done, the database location needs to be set. Create a folder somewhere called "data", and tell mongo to use this as it's storage location with this command:

$ mongod --dbpath C:\Users\user\Desktop\data

This folder does not need to be located in the project directory.

Then open a third command line window and change directory to the project location. This command will start the server on port 8090:

$ nodemon server.js

Proceed to localhost:8090 to view the homepage.
