const {Markup} = require("telegraf")
const {SqlService} = require("../lib/sql_service.js")
const service = new SqlService();
const {UserClass} = require("../lib/userClass.js")


const reply_button = {
    reply_markup: {
        keyboard: [
            [{text: "Tests 🎯"}, {text: "Learning 🧑‍🎓"}],
            [{text: "About"}, {text: "Help"}],
            [{text: "My statistic 🚀"}]
        ],
        resize_keyboard: true
    }
    
}
 

async function startCommand(ctx){
    
    const newUser = new UserClass(
        ctx.from.first_name,
        ctx.from.username,
        ctx.from.id
    )

    await service.createNewUser(newUser)
    .then((data) => {
        ctx.reply(`Welcome ${ctx.from.first_name} to the bot which can Find out your English level 🇺🇸`, reply_button);
    })
    .catch(err => {
        ctx.reply(`Welcome back ${ctx.from.first_name}, determine your level of English  🇺🇸`, reply_button);
    })


}

module.exports = {startCommand};


