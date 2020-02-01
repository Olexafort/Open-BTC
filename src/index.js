const axios = require('axios')
const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')

var btcUSDPrices = [{
    "date": new Date(),
    "price": 0
}]

var btcEURPrices = [{
    "date": new Date(),
    "price": 0
}]

var ethUSDPrices = [{
    "date": new Date(),
    "price": 0
}]

var ethEURPrices = [{
    "date": new Date(),
    "price": 0
}]


function getCurrentPrice() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR&api_key=8c069ca19836a60b5da4177f9d267bc8b1502f72c4bc46cbb1b2dc329dc38832').then(res => {
        //console.log(res.data);

        document.getElementById("current_btc_usd").innerHTML = "$ " + res.data.BTC.USD
        document.getElementById("previous_btc_usd").innerHTML = "$ " + btcUSDPrices[btcUSDPrices.length - 1].price

        document.getElementById("current_btc_eur").innerHTML = "€ " + res.data.BTC.EUR
        document.getElementById("previous_btc_eur").innerHTML = "$ " + btcUSDPrices[btcEURPrices.length - 1].price

        document.getElementById("current_eth_usd").innerHTML = "$ " + res.data.ETH.USD
        document.getElementById("previous_eth_usd").innerHTML = "$ " + btcUSDPrices[ethUSDPrices.length - 1].price

        document.getElementById("current_eth_eur").innerHTML = "€ " + res.data.ETH.EUR
        document.getElementById("previous_eth_eur").innerHTML = "$ " + btcUSDPrices[ethEURPrices.length - 1].price

        btcUSDPriceMonitor(res.data.BTC.USD)
        btcEURPriceMonitor(res.data.BTC.EUR)
        ethUSDPriceMonitor(res.data.ETH.USD)
        ethEURPriceMonitor(res.data.ETH.EUR)

        myBTCTarget();
    })
}

getCurrentPrice();
setInterval(getCurrentPrice, 10000);

function btcUSDPriceMonitor(btcAmt) {

    //console.log(btcUSDPrices)
    var btcUSDValue = btcUSDPrices[btcUSDPrices.length - 1].price
        //console.log(btcUSDValue)
    document.getElementById("previous_btc_usd").innerHTML = "$ " + btcUSDValue

    //console.log(btcAmt)
    if (btcUSDValue > btcAmt) {
        console.log("Decrease: " + btcAmt + " From " + btcUSDValue)
        btcUSDPrices.push({
            "date": new Date(),
            "price": btcAmt
        })

    } else {
        console.log("Increase: " + btcUSDValue + " To " + btcAmt)
        btcUSDPrices.push({
            "date": new Date(),
            "price": btcAmt
        })
    }
}

function btcEURPriceMonitor(btcAmt) {

    //console.log(btcEURPrices)
    var btcEURValue = btcEURPrices[btcEURPrices.length - 1].price
        //console.log(btcEURValue)
    document.getElementById("previous_btc_eur").innerHTML = "$ " + btcEURValue

    //console.log(btcAmt)
    if (btcEURValue > btcAmt) {
        console.log("Decrease: " + btcAmt + " From " + btcEURValue)
        btcEURPrices.push({
            "date": new Date(),
            "price": btcAmt
        })

    } else {
        console.log("Increase: " + btcEURValue + " To " + btcAmt)
        btcEURPrices.push({
            "date": new Date(),
            "price": btcAmt
        })
    }
}

function ethUSDPriceMonitor(btcAmt) {

    //console.log(ethUSDPrices)
    var ethUSDValue = ethUSDPrices[ethUSDPrices.length - 1].price
        //console.log(ethUSDValue)
    document.getElementById("previous_eth_usd").innerHTML = "$ " + ethUSDValue

    //console.log(btcAmt)
    if (ethUSDValue > btcAmt) {
        console.log("Decrease: " + btcAmt + " From " + ethUSDValue)
        ethUSDPrices.push({
            "date": new Date(),
            "price": btcAmt
        })

    } else {
        console.log("Increase: " + ethUSDValue + " To " + btcAmt)
        ethUSDPrices.push({
            "date": new Date(),
            "price": btcAmt
        })
    }
}

function ethEURPriceMonitor(btcAmt) {

    //console.log(ethEURPrices)
    var ethEURValue = ethEURPrices[ethEURPrices.length - 1].price
        //console.log(ethEURValue)
    document.getElementById("previous_eth_eur").innerHTML = "$ " + ethEURValue

    //console.log(btcAmt)
    if (ethEURValue > btcAmt) {
        console.log("Decrease: " + btcAmt + " From " + ethEURValue)
        ethEURPrices.push({
            "date": new Date(),
            "price": btcAmt
        })

    } else {
        console.log("Increase: " + ethEURValue + " To " + btcAmt)
        ethEURPrices.push({
            "date": new Date(),
            "price": btcAmt
        })
    }
}

function myBTCTarget() {
    const btcTargetBtn = document.getElementById('btcTarget');

    btcTargetBtn.addEventListener('click', function(event) {
        btcTargetModalPath = path.join('file://', __dirname, 'btcTarget.html')
        let btcTargetWin = new BrowserWindow({ frame: false, alwaysOnTop: true, width: 600, height: 400 })

        btcTargetWin.on('close', function() { win = null })
        btcTargetWin.loadURL(btcTargetModalPath)
        btcTargetWin.show();
    })
}