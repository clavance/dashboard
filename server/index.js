//jshint esversion:6

const express = require('express'),
      app = express(),
      path = require('path'),
      cors = require('cors'),
      request = require('request'),
      fs = require('fs'),
      jsonfile = require('jsonfile'),
      router = express.Router(),
      config = require('../client/src/config.json'),
      DIST_DIR = path.join(__dirname, '../client/public/'),
      HTML_FILE = path.join(DIST_DIR, 'index.html');

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.static(DIST_DIR));

app.get("/login", (req, res) => {
  res.redirect("https://auth.monzo.com/?client_id=" + config.client_id + "&redirect_uri=" +
      config.redirect_uri + "&response_type=" + config.response_type + "&state=" + config.state_token);
});


app.get("/oauth/callback", (req, res) => {
  global.code = req.query.code; //store the code in a global variable

  var client_id = config.client_id,
      client_secret = config.client_secret,
      redirect_uri = config.redirect_uri,
      grant_type = config.grant_type;

  request.post(
    {
      url: "https://api.monzo.com/oauth2/token",
      form: {
        grant_type,
        client_id,
        client_secret,
        redirect_uri,
        code
      }
    },

    (err, response, body) => {
      global.access_token = JSON.parse(body).access_token; //get the access token from response
      console.log("oauth callback response: ", body);
      console.log("access token: ", access_token);
      res.redirect("/pending");
    }
  );
});


app.get("/pending", (req, res) => {
  res.redirect("http://localhost:3000/pending");
})


app.get("/accounts", (req, res) => {
  var account_type = config.account_type,
      access_token = global.access_token;

  request.get("https://api.monzo.com/accounts?account_type=" + account_type,
    {
      headers: {
        Authorization: "Bearer " + access_token
      }
    },

    (error, response, body) => {

      var json = JSON.parse(body);
      console.log("accounts json: ", json);

      var account_desc = json.accounts[0].description,
          account_type = json.accounts[0].type,
          account_currency = json.accounts[0].currency,
          account_num = json.accounts[0].account_number,
          sort_code = json.accounts[0].sort_code,
          owner_name = json.accounts[0].owners[0].preferred_name;

      global.account_id = json.accounts[0].id; //account ID stored in global variable
      sort_code = sort_code.slice(0,2)+"-"+sort_code.slice(2,4)+"-"+sort_code.slice(4,6);

      res.json({
        account_id: account_id,
        account_desc: account_desc,
        account_type: account_type,
        account_currency: account_currency,
        account_num: account_num,
        sort_code: sort_code,
        owner_name: owner_name
      });

    }
  );
});


app.get("/balance", (req, res) => {
  var account_id = global.account_id;

  request.get(
    {
      url: "https://api.monzo.com/balance?account_id=" + account_id,
      headers: {
        Authorization: "Bearer " + global.access_token
      }
    },

    (error, response, body) => {
      var json = JSON.parse(body);
      console.log("balances: ", json);

      var balance = json.balance,
          total_balance = json.total_balance,
          spend_today = json.spend_today;

      balance = (balance/100).toFixed(2); //add decimal pt
      total_balance = (total_balance/100).toFixed(2);
      if (spend_today<0) {
        spend_today = (spend_today/100).toFixed(2);
        spend_today = spend_today.substr(1); //removes the leading "-"
      }
      else spend_today = 0;

      res.json({
        balance: balance,
        total_balance: total_balance,
        spend_today: spend_today
      });
    }
  );
});


app.get("/transactions", (req, res) => {
  var account_id = global.account_id;

  request.get(
    {
      url: "https://api.monzo.com/transactions?expand[]=merchant&account_id=" + account_id,
      headers: {
        Authorization: "Bearer " + global.access_token
      }
    },

    (error, response, body) => {
      const file = '../client/src/views/Dashboard/components/RecentTransactions/transactions.json';
      var json = JSON.parse(body);
      console.log("transactions: ", json);

      const transactions = json.transactions;
      const obj = JSON.stringify(transactions);

      jsonfile.writeFile(file, obj) //save all transactions, access expires after 5min
      .then(res => console.log('Transactions data written to transactions.json.'))
      .catch(err => console.log(err));

      res.json({
        transactions: transactions //return transactions obj just in case
      });
    }
  );
});

app.get('/', (req, res) => {
 res.sendFile(HTML_FILE);
});

app.listen(port, function () {
 console.log('App listening on port: ' + port);
});

module.exports = router;
