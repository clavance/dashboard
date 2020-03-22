## Dashboard
This is a web dashboard application with a React front-end and an Express back-end.  
It is connected to Monzo, Google Maps as well as Calendar and Weather APIs.  

The application pulls data from a user's Monzo account using Monzo's API. Due to Monzo's strong customer authentication, it requires the user to approve access to the application via both email and the Monzo phone app.  

Strong authentication also results in transaction permissions expiring after 5 minutes, so on a successful login the application saves all the user's transactions into a JSON file which is then read and rendered by the relevant React component.  

The application loads a map via Google Maps' API with a marker indicating the location of the most recent transaction. It displays the user's name, balances, amount spent on the present day, and most recent transactions. The user can also view the entire log of all their transactions.   

![](dashboard.gif)

## Instructions
1. The application requires a working Monzo account and a Google Maps API key.
2. Log in to the [Monzo Developer Portal](https://developers.monzo.com/api), approve access via email and the Monzo phone app.
3. Navigate to Clients and add a New OAuth Client.
4. Add the relevant Redirect URI.
5. Note the Client ID and Client Secret, these should not be disclosed to anyone.
6. Obtain a Google Maps API key (credit card required).
6. Amend the file `/client/src/config.json` with the required information.
7. `git clone` this repo

**Steps to run server (development)**:
1. `cd server`
2. `npm i`
3. `npm start`, server runs on port 3001

**Steps to run client**:
1. `cd client`
2. `npm i`
3. `npm start`, client runs on port 3000

## To do
- nginx for routing
- React testing
