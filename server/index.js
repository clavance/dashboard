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
const urls = {
  base_url: "https://auth.monzo.com/",
  token_url: "https://api.monzo.com/oauth2/token",
  account_url: "https://api.monzo.com/accounts",
  balance_url: "https://api.monzo.com/balance",
  transactions_url: "https://api.monzo.com/transactions"
};

app.use(cors());
app.use(express.static(DIST_DIR));

app.get("/login", (req, res) => {
  res.redirect(
    urls.base_url +
      "?client_id=" +
      config.client_id +
      "&redirect_uri=" +
      config.redirect_uri +
      "&response_type=" +
      config.response_type +
      "&state=" +
      config.state_token
  );
});


app.get("/oauth/callback", (req, res) => {
  global.code = req.query.code; //store the code in a global variable

  var client_id = config.client_id,
      client_secret = config.client_secret,
      redirect_uri = config.redirect_uri,
      grant_type = config.grant_type,
      url = urls.token_url;

  request.post(
    {
      url: url,
      form: {
        grant_type,
        client_id,
        client_secret,
        redirect_uri,
        code
      }
    },

    (err, response, body) => {
      global.access_token = JSON.parse(body).access_token;
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
      account_url = urls.account_url,
      access_token = global.access_token;

  request.get(account_url + "?account_type=" + account_type,
    {
      headers: {
        Authorization: "Bearer " + access_token
      }
    },

    (error, response, body) => {

      var jsonBody = JSON.parse(body);
      console.log("accounts json: ", jsonBody);

      var account_desc = jsonBody.accounts[0].description,
          account_type = jsonBody.accounts[0].type,
          account_currency = jsonBody.accounts[0].currency,
          account_num = jsonBody.accounts[0].account_number,
          sort_code = jsonBody.accounts[0].sort_code,
          owner_name = jsonBody.accounts[0].owners[0].preferred_name;

      global.account_id = jsonBody.accounts[0].id;
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
  var balance_url = urls.balance_url,
      account_id = global.account_id;

      console.log("account id:", account_id);

  request.get(
    {
      url: balance_url + "?account_id=" + account_id,
      headers: {
        Authorization: "Bearer " + global.access_token
      }
    },

    (error, response, body) => {
      var jsonBody = JSON.parse(body);
      console.log("balances: ", jsonBody);

      var balance = jsonBody.balance,
          total_balance = jsonBody.total_balance,
          spend_today = jsonBody.spend_today;

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
  var transactions_url = urls.transactions_url,
      account_id = global.account_id;

  request.get(
    {
      url: transactions_url + "?expand[]=merchant&account_id=" + account_id,
      headers: {
        Authorization: "Bearer " + global.access_token
      }
    },

    (error, response, body) => {
      const file = '../client/src/views/Dashboard/components/RecentTransactions/transactions.json';
      var jsonBody = JSON.parse(body);
      console.log("transactions: ", jsonBody);

      const transactions = jsonBody.transactions;
      const obj = JSON.stringify(transactions);

      jsonfile.writeFile(file, obj)
      .then(res => console.log('Transactions data written to transactions.json.'))
      .catch(err => console.log(err));

      res.json({
        transactions: transactions
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
