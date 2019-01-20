const contract = require('truffle-contract');

const metacoin_artifact = require('../build/contracts/Asset.json');
var MetaCoin = contract(metacoin_artifact);






module.exports = {
  
  
  
  
  
  
  start: function(location,cost,callback) {
    var self = this;

    
    


    if(typeof self.web3.currentProvider.sendAsync !== "function"){
      self.web3.currentProvider.sendAsync = function() {
        return self.web3.currentProvider.send.apply(
          self.web3.currentProvider,
          arguments
        );
      };
    };
    
    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.


    self.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[2];

      // MetaCoin.deployed().then(function(instance){
      //   var meta = instance
      //   meta.addLand(location,cost);
      //   callback(location);
      // })
    });
  },

  mint: function(name,amount,metaData,symbol,id){
    var self = this;

    if(typeof self.web3.currentProvider.sendAsync !== "function"){
      self.web3.currentProvider.sendAsync = function() {
        return self.web3.currentProvider.send.apply(
          self.web3.currentProvider,
          arguments
        );
      };
    };
    



    MetaCoin.setProvider(self.web3.currentProvider);
    MetaCoin.deployed().then(function (instance) {
      var meta = instance;
      return meta.mint('abc',123,'abc',0,'abcd',12);
      
    });
  }
  // refreshBalance: function(account, callback) {
  //   var self = this;

  //   // Bootstrap the MetaCoin abstraction for Use.
  //   MetaCoin.setProvider(self.web3.currentProvider);

  //   var meta;
  //   MetaCoin.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.getBalance.call(account, {from: account});
  //   }).then(function(value) {
  //       callback(value.valueOf());
  //   }).catch(function(e) {
  //       console.log(e);
  //       callback("Error 404");
  //   });
  // },
  // sendCoin: function(amount, sender, receiver, callback) {
  //   var self = this;

  //   // Bootstrap the MetaCoin abstraction for Use.
  //   MetaCoin.setProvider(self.web3.currentProvider);

  //   var meta;
  //   MetaCoin.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.sendCoin(receiver, amount, {from: sender});
  //   }).then(function() {
  //     self.refreshBalance(sender, function (answer) {
  //       callback(answer);
  //     });
  //   }).catch(function(e) {
  //     console.log(e);
  //     callback("ERROR 404");
  //   });
  // }
}
