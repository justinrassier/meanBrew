Web-based brewing software based off of the MEAN stack.





This is the basic MEAN setup from the PluralSight course. It uses the following components:
* Node
* Express
* Mongo DB
* Angular
* Jade - HTML rendering engine
* Stylus - CSS pre-compilation engine

To install and run
- Install Node and npm and make sure it is added to your PATH (installer usually takes care of this)
- Install MongoDB and have it running
    -> Startup the MongoDB shell and type the following to get a DB and insert a message:
    -> use basicMean
    -> db.messages.insert({"message": "Hello MONGO!"});
- Install git (required for bower, it uses git to retrieve the files)
- Install Bower globally (Bower is like npm but for client-side scripts like angular)
    -> npm install -g bower
- Install Jade and Stylus globally (not necessary as it will be installed locally, but WebStorm IDE needs it global to add a watcher)
   -> npm install -g jade
   -> npm install -g stylus
- use a command prompt, navigate to this directory and run
    -> npm install
    -> bower install
    This uses the package.json and bower.json files to retrieve dependencies and install them locally

To run
    -> node server.js

handy tool is nodemon. This will monitor the project for any changes and restart node automatically
    -> npm install -g nodemon

Then instead call nodemon instead of standard node
    ->nodemon server.js
