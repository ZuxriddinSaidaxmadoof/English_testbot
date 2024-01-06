const {startCommand} = require("./src/commands/start.js")
const {Hears} = require("./src/commands/hears.js")

const {telegram_api} = require("./config/config.js")
const {Telegraf} = require("telegraf")
const app = new Telegraf(telegram_api)


const AllHears = new Hears()

app.start(async(ctx) => {
    startCommand(ctx)
})



try{
    AllHears.HearTestStart(app);
}catch(err){
    console.log(err);
}




app.launch()


