const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');
const {PythonShell} =require('python-shell');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', express.static('public_static'));

app.post('/addLand', (req, res) => {
  // console.log();
  var location = req.body.location;
  var cost = req.body.cost;
  truffle_connect.start(location,cost,function (answer) {
    res.send(answer);
  })
});

app.post('/mint',(req,res)=>{
  var name = req.body.name;
  var amount = req.body.amount;
  var metaData = req.body.metaData;
  var symbol = req.body.symbol;
  var id = req.body.id;
  return truffle_connect.mint(name,amount,metaData,symbol,id);
  
})

app.post('/py',(req,res)=>{

      var options = {
        mode: 'text',
        args: [parseFloat(req.body.area), req.body.street, req.body.stories,req.body.bedRoom,req.body.age]
    };
    // console.log(options.args);

    PythonShell.run('load_model.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        res.send(results);  
    });


});

// app.post('/getBalance', (req, res) => {
//   console.log("**** GET /getBalance ****");
//   console.log(req.body);
//   let currentAcount = req.body.account;

//   truffle_connect.refreshBalance(currentAcount, (answer) => {
//     let account_balance = answer;
//     truffle_connect.start(function(answer){
//       // get list of all accounts and send it along with the response
//       let all_accounts = answer;
//       response = [account_balance, all_accounts]
//       res.send(response);
//     });
//   });
// });

// app.post('/sendCoin', (req, res) => {
//   console.log("**** GET /sendCoin ****");
//   console.log(req.body);

//   let amount = req.body.amount;
//   let sender = req.body.sender;
//   let receiver = req.body.receiver;

//   truffle_connect.sendCoin(amount, sender, receiver, (balance) => {
//     res.send(balance);
//   });
// });

app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

  console.log("Express Listening at http://localhost:" + port);

});
