
App = {
  id:0,
  web3Provider: null,
  contracts: {},

  init: function () {
      return App.initWeb3();
  },

  initWeb3: async () => {
      if (App.ethereum) {
          App.web3 = new Web3(ethereum);
          try {
              await ethereum.enable();
          } catch (error) {
              console.log("User denied account access...")
          }
      }
      else if (typeof web3 !== 'undefined') {
          App.web3Provider = web3.currentProvider;
          web3 = new Web3(web3.currentProvider);
      } else {
          App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
          web3 = new Web3(App.web3Provider);
      }
      return App.initContract();
  },

  initContract: function () {
      $.getJSON('Asset.json', function (data) {
          var AssetArtifact = data;
          //console.log(data)
          App.contracts.Asset = TruffleContract(AssetArtifact);
          App.contracts.Asset.setProvider(App.web3Provider);
      });

      return App.bindEvents();
  },

  bindEvents: function () {

      //Mint
      $("#mint-button").click({}, App.mint);
      $('#py-button').click(App.py);
      $('#transferFrom').click({},App.tFrom);
      $('#balCheck').click({},App.balCheck);
      $('#view-button').click({},App.view);
      // $("#mintButton2").click({
      //     param1: "tibia-giant-sword",
      //     param2: 2,
      //     param3: "TGS"
      // }, App.mint);
      // $("#mintButton3").click({
      //     param1: "tibia-haunted-blade",
      //     param2: 3,
      //     param3: "THS"
      // }, App.mint);
      // $("#mintButton4").click({
      //     param1: "tibia-magic-sword",
      //     param2: 4,
      //     param3: "TMS"
      // }, App.mint);
      // $("#mintButton5").click({
      //     param1: "tibia-mercenary-sword",
      //     param2: 5,
      //     param3: "TYS"
      // }, App.mint);
      // $("#mintButton6").click({
      //     param1: "tibia-pharaoh-sword",
      //     param2: 6,
      //     param3: "TPS"
      // }, App.mint);
      // $("#mintButton7").click({
      //     param1: "tibia-the-avenger",
      //     param2: 7,
      //     param3: "TAS"
      // }, App.mint);
      // $("#mintButton8").click({
      //     param1: "tibia-shiny-blade",
      //     param2: 8,
      //     param3: "TSS"
      // }, App.mint);
      // $("#mintButton9").click({
      //     param1: "tibia-zaoan-sword",
      //     param2: 9,
      //     param3: "TZS"
      // }, App.mint);

      //Balance
      // $("#balanceButton1").click({
      //     param1: 1,
      // }, App.getBalance);
      // $("#balanceButton2").click({
      //     param1: 2,
      // }, App.getBalance);
      // $("#balanceButton3").click({
      //     param1: 4,
      // }, App.getBalance);
      // $("#balanceButton4").click({
      //     param1: 4,
      // }, App.getBalance);
      // $("#balanceButton5").click({
      //     param1: 5,
      // }, App.getBalance);
      // $("#balanceButton6").click({
      //     param1: 6,
      // }, App.getBalance);
      // $("#balanceButton7").click({
      //     param1: 7,
      // }, App.getBalance);
      // $("#balanceButton8").click({
      //     param1: 8,
      // }, App.getBalance);
      // $("#balanceButton9").click({
      //     param1: 9,
      // }, App.getBalance);

      // //Transfer
      // $("#transferButton1").click({
      //     param1: 1
      // }, App.transfer);


      // $("#acBalance2").click({
      //     param1: 2,
      // }, App.getBalanceAccount);

  },
  view: function (event){
    event.preventDefault();
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
          console.log(error);
      }
      App.contracts.Asset.deployed().then(function (instance) {
          AssetInstance = instance;
          return AssetInstance.returnAssetCount();
      }).then((totalCount)=>{
        App.contracts.Asset.deployed().then(function(instance){
          AssetInstance = instance;
          
          console.log(totalCount);
          
          AssetInstance.token(parseInt(1)).then((data)=>{
            console.log(data);
          });
        });
      })
      .catch(function (err) {
          console.log(err.message);
      });
  })
  },
  tFrom: function(event){
    console.log('transfer');
    event.preventDefault();
    var to = $("#to").val();
    var id = $("#id").val();
    var value = $("#amount").val();;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
          console.log(error);
      }
      App.contracts.Asset.deployed().then(function (instance) {
          AssetInstance = instance;
          return AssetInstance.transfer( to, id, value);
      })
      .then((data)=>{
        console.log(data.tx);
        var li = `<li> The transaction is ${data.tx}</li>`;
        $("#log-data").append(li);
      })
      .catch(function (err) {
          console.log(err.message);
      });
  })
},
  
  balCheck: function(event){

    console.log('hi');
    event.preventDefault();
    var id = $("#balId").val();
  
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
          console.log(error);
      }
      App.contracts.Asset.deployed().then(function (instance) {
          AssetInstance = instance;
          console.log("Id", id);
          return AssetInstance.balanceOf(id);
      }).then((balance)=>{
        console.log(balance);
      }).catch(function (err) {
          console.log(err.message);
      });
  });
  },
  py: function(event){
    event.preventDefault();
    
    url = "/py";
    var area = $("#Area").val();
    var street = $("#street").val();
    var stories = $("#stories").val();
    var bedRoom = $("#bed-room").val();
    var age = $("#age").val();
    var posting = $.post(url,{area,street,stories,bedRoom,age});
    posting.done(function(response){
      var li = `<li>The expected price is ${response}</li>`;
      $("#log-data").append(li);
      // console.log(`The expected price is ${id}`);
    })
  },


  mint: function (event) {
      event.preventDefault();
         
    var name = $("#name").val();
    var amount = $("#amount").val();
    var metaData = $("#metaData").val();
    var symbol = $("#symbol").val();
    
    
      web3.eth.getAccounts(function (error, accounts) {
          if (error) {
              console.log(error);
          }
          App.contracts.Asset.deployed().then(function (instance){
            AssetInstance = instance;
            return AssetInstance.returnAssetCount();
          })
          .then(function (id) {
            App.contracts.Asset.deployed().then(function (instance) {
              AssetInstance = instance;
              console.log(name ,amount ,metaData ,parseInt(id) + 1);
              AssetInstance.mint(name, amount, metaData, 0, symbol, parseInt(id)+1).then((id2)=>{
                console.log("hello",id2);;
          })
          })
          })
          .catch(function (err) {
              console.log(err.message);
          });
      });
  },

  // getBalance: function (event) {
  //     event.preventDefault();
  //     let id = event.data.param1;
  //     let AssetInstance;

  //     web3.eth.getAccounts(function (error, accounts) {
  //         if (error) {
  //             console.log(error);
  //         }
  //         App.contracts.Asset.deployed().then(function (instance) {
  //             AssetInstance = instance;
  //             return AssetInstance.balanceOf.call(id, accounts[0]);
  //         }).then(function (result) {
  //             alert("Balance (id=" + id + ") is : " + result);
  //         }).catch(function (err) {
  //             console.log(err.message);
  //         });
  //     });
  // },

  // transfer: function (event) {
  //     event.preventDefault();
  //     let id = event.data.param1;
  //     let accountNumber = $("#acTransfer1").val()
  //     let amount = $("#acAmount1").val()
  //     let idSelector = "#acAddress" + accountNumber
  //     let addressTo = $(idSelector).val()

  //     let AssetInstance
  //     App.contracts.Asset.deployed().then(function (instance) {
  //         AssetInstance = instance;
  //         return AssetInstance.transfer(addressTo, id, amount);
  //     }).then(function (result) {
  //         alert('testTransfer: ' + JSON.stringify(result));
  //     }).catch(function (err) {
  //         console.log(err.message);
  //     });
  // },

  // getBalanceAccount: function (event) {
  //     event.preventDefault();
  //     let accountNumber = event.data.param1;
  //     let accSelector = "#acAddress" + accountNumber
  //     let address = $(accSelector).val()

  //     let idSelector = "#idBalance" + accountNumber
  //     let id = $(idSelector).val()

  //     let AssetInstance;

  //     web3.eth.getAccounts(function (error, accounts) {
  //         if (error) {
  //             console.log(error);
  //         }
  //         App.contracts.Asset.deployed().then(function (instance) {
  //             AssetInstance = instance;
  //             return AssetInstance.balanceOf.call(id, address);
  //         }).then(function (result) {
  //             alert("Balance (id=" + id + ") is : " + result);
  //         }).catch(function (err) {
  //             console.log(err.message);
  //         });
  //     });
  // }

};

$(function () {
  $(window).on("load", function () {
      App.init();
  });
});






















    
    
    
//     if(typeof web3 !== 'undefined'){
//       web3 = new Web3(self.web3.currentProvider);
//       web3.currentProvider.enable();
//       console.log('part1');
//     }else{
//       web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
//       console.log("part 2");
//     }




// // $(document).ready(function () {
// //   var curraccount;
// //   var selectedAccount;
// //   $.get('/getAccounts', function (response) {
// //     console.log(response);
// //   })

//   // $('#submit').click(function () {
    
//   //   console.log("one");
//   //   $.post('/addLand', {account : selectedAccount}, function (response) {

//   //       console.log("abcd", response);
//   //     // $('.select').removeClass("active");
//   //     // $('.send').addClass("active");
//   //     // $('#account').text(selectedAccount);
//   //     // $('#balance').text(response[0]);
//   //     // var current_account_index = response[1].indexOf(selectedAccount);
//   //     // response[1].splice(current_account_index,1); //remove the selected account from the list of accounts you can send to.
//   //     // $('#all-accounts').addClass("active");
//   //     // var list= $('#all-accounts > ol');
//   //     // for(let i=0;i< response[1].length;i++){
//   //     //   li="<li>"+response[1][i]+"</li>";
//   //     //   list.append(li)
//   //     // }


      



//   //   })
//   // })

//   $('#mint-form').submit(function (event){
      
//     event.preventDefault();
    
//     var name = $(this).find("input[name='name']").val();
//     var amount = $(this).find("input[name='amount']").val();
//     var metaData = $(this).find("input[name='metaData']").val();
//     var symbol = $(this).find("input[name='symbol']").val();
//     var id = $(this).find("input[name='id']").val();
    
    
    
//     console.log(location);
//     url = "/mint";
//     var posting = $.post(url,{name,amount,metaData,symbol,id});
//     posting.done(function(response){
//       // var li = $(response).find("#content");
//       // $("#result").empty().append(li);
//       console.log(response);
//     })
//   })

// //   $('#send').click(function () {
// //     $('#status').text("Sending...");
// //     let amount = $('#amount').val();
// //     let receiver = $('#receiver').val();
// //     $.post('/sendCoin', {amount : amount, sender : selectedAccount, receiver : receiver}, function (response) {
// //       $('#balance').text(response);
// //       $('#status').text("Sent!!");
// //     })
// //   });
// // })
