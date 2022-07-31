// Done! Congratulations on your new bot. You will find it at t.me/My_BLE_Bot.
// Use this token to access the HTTP API:
// 5593353604:AAEp8W8IUnUGZoD34vB113HM-xccxApUFCk
// Keep your token secure and store it safely, it can be used by anyone to control your bot.
// 88:25:83:F4:DD:9D MLT-BT05

// let count  = 0;
// const increaseCount = () => {
//     count++;
//     console.log({count});
// }
// const countInterval = setInterval(increaseCount, 1000);

const noble = require("noble");
const axios = require('axios').default;

const telegramBotToken = "5593353604:AAEp8W8IUnUGZoD34vB113HM-xccxApUFCk";
const telegramChatId = "5463612881";
const sendMessage = async (text) => {
    const sendUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${text}`;
    await axios.get(encodeURI(sendUrl));
};

noble.on("stateChange", async (state) => {
    // console.log({state});
    // if(state==='poweredOn') noble.startScanning([], true);
    if(state==='poweredOn') noble.startScanning();
});
const connectCallback = async (error) => {
    console.log("connected");
    await sendMessage("집 도착");
};
const disconnectCallback = async (error) => {
    console.log("disconnect");
    await noble.stopScanning();
    await noble.startScanning();
    await sendMessage("외출");
};
noble.on("discover", async (discover) => {
    if(discover.address.toUpperCase() === "88:25:83:F4:DD:9D" && discover.advertisement.localName === 'MLT-BT05'){
        if(discover.listenerCount("connect") === 0) await discover.prependListener("connect", connectCallback);
        if(discover.listenerCount("disconnect") === 0) await discover.prependListener("disconnect", disconnectCallback);
        await discover.connect();
    }
})      