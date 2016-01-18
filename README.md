dash-adherence
==============

Use an Amazon Dash button to log every time you take your medication.

This Node.js app will write a simple entry to a Postgre instance every time you click your dash button.

To configure the Dash Button, follow the instructions here:


To configure the server, rename the config.sample.json to config.json, and fill in your own details. Enter the MAC address of the Dash button, and name your medication entry.  The Postgre connection string should be edited to connect your instance.

The 'dash_window' parameter exists so to prevent duplicate entries. If the button is pressed again within the window of minutes (default 5), it will not log an entry to the database.

Be sure to run 'npm install'.

To run, execute 'sudo node index.js'.

To test the input without hitting the button, run 'sudo mocha spec.js'.

