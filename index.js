/**
 * Hardware
 *  - MAC ADDRESS: 88:25:83:F4:DD:9D
 *  - LOCAL NAME: MLT-BT05
 * Telegram
 *  - Bot Token : 5593353604:AAEp8W8IUnUGZoD34vB113HM-xccxApUFCk
 *  - chatId: 5463612881
 *  - Get Chat ID: Visit `https://api.telegram.org/bot${BotToken}/getUpdates`
 */

const noble = require("noble");
const axios = require('axios').default;
let isFetching = false;

const MAC_ADDRESS = "88:25:83:F4:DD:9D";
const LOCAL_NAME = "MLT-BT05";

const telegramBotToken = "5593353604:AAEp8W8IUnUGZoD34vB113HM-xccxApUFCk";
const telegramChatId = "5463612881";
const sendMessage = async (text) => {
    const sendUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${text}`;
    await axios.get(encodeURI(sendUrl));
};

noble.on("stateChange", async (state) => {
    if(state==='poweredOn') noble.startScanning();
});
const connectCallback = async () => {
    try {
        if(isFetching) return null;
        isFetching = true;
        await sendMessage("집 도착");
    } catch (error) {
        console.error(error);
    } finally {
        isFetching = false;
    }
};
const disconnectCallback = async () => {
    if(isFetching) return null;
    await noble.stopScanning();
    await noble.startScanning();
    try {
        isFetching = true;
        await sendMessage("외출");
    } catch (error) {
        console.error(error);
    } finally {
        isFetching = false;
    }
};
noble.on("discover", async (discover) => {
    if(isFetching) return null;
    // console.log({discover})
    if(discover.address.toUpperCase() === MAC_ADDRESS && discover.advertisement.localName === LOCAL_NAME){
        if(discover.listenerCount("connect") === 0) await discover.prependListener("connect", connectCallback);
        if(discover.listenerCount("disconnect") === 0) await discover.prependListener("disconnect", disconnectCallback);
        await discover.connect();
    }
})      
