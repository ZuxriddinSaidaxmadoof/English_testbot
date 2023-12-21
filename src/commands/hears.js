const {SqlService} = require("../lib/sql_service.js")
const sqlService = new SqlService();
const {uniqueRandomNumbers} = require("../lib/getRandomNumber.js")
const {Markup} = require("telegraf")
// const {VariantsClass} = require("../lib/hears.variantClass.js");


const reply_buttons = {
    reply_markup: {
        keyboard: [
            [{text: "Start testing"}],
            [{text: "Back to home page"}]
        ],
        resize_keyboard: true

    }
}

const stop_button = {
    reply_markup: {
        keyboard: [
            [{text: "Stop"}]
        ],
        resize_keyboard: true


    }
}


class Hears{
 #randomQuestions = [];
 #message_id;
 #answer_id;
 #page = 1;
 #result = 0;


    HearTestStart(app){
        app.hears("Tests 🎯", async(ctx) => {
            ctx.reply("Lets start tests 🏃‍♂️", reply_buttons)

            await this.ShowTests(1, app)
        })
        app.hears("Start testing", async(ctx) => {
            ctx.replyWithMarkdown(`*start 🚀*`, stop_button)
            // console.log(this.#randomQuestions);
            await this.findVariants(ctx, this.#page, app);
            

        })
    }

        ShowTests(){
            sqlService.getAllQuestions().then(data => {
                uniqueRandomNumbers.forEach(element => {
                    data.rows.forEach(row => {
                        if(row.id == element){
                            this.#randomQuestions.push(row)
                        }
                    })
                })
            })
            .catch(err => {
                console.log("Error:", err);
            })


        }
///////////______________pending_______________///////////
        findVariants(ctx, page, app){

            sqlService.getAllVariants().then(data => {

                const pageVariants = data.rows.filter(element => {
                    return element.question_id == page
                })

                const variantButtons = this.makeVariantBurron(
                    pageVariants[0], 
                    pageVariants[1], 
                    pageVariants[2], 
                    pageVariants[3],
                    app,
                    ctx
                );
///// there will be check to 20 questions
                const messageFindId = ctx.replyWithMarkdown(`
                _${this.#page}/20_
*${page}.* ${this.#randomQuestions[page -1].title}?`, variantButtons)
                messageFindId.then(m => {
                    this.#message_id = m.message_id; 
                    // console.log("message id:",this.#message_id);
                })
            })
        }


///////////______________pending_______________///////////


        makeVariantBurron(A, B, C, D, app, ctx){
            const button = Markup.inlineKeyboard([
                [Markup.button.callback(`A: ${A.variant_text}`, `${A.id}`)],
                [Markup.button.callback(`B: ${B.variant_text}`, `${B.id}`)],
                [Markup.button.callback(`C: ${C.variant_text}`, `${C.id}`)],
                [Markup.button.callback(`D: ${D.variant_text}`, `${D.id}`)]
            ])
        
            app.action(`${A.id}`, async(ctx) => {
                if(A.correct  == "false"){
                    this.#answer_id = ctx.reply("Wrong answer 🙅‍♂️")
                }else{
                    this.#result++
                    this.#answer_id = ctx.reply("Correct answer ✅")
                }
                this.#page++
                await this.deleteMassage(ctx, this.#message_id);
                setTimeout(async (e) => {
                    await this.deleteAnswer(ctx)
                } , 2000)

                if(this.#page > 20){
                    this.resultRespons(ctx);
                }else{
                    await this.findVariants(ctx, this.#page, app)  
                }
            }) 

            app.action(`${B.id}`, async ctx => {
                if(B.correct == "false"){
                    this.#answer_id = ctx.reply("Wrong answer 🙅‍♂️")
                }else{
                    this.#result++
                    this.#answer_id = ctx.reply("Correct answer ✅")
                }
                this.#page++
                await this.deleteMassage(ctx, this.#message_id);
                setTimeout(async (e) => {
                    await this.deleteAnswer(ctx)
                } , 2000)
                if(this.#page > 20){
                    this.resultRespons(ctx);
                }else{
                    await this.findVariants(ctx, this.#page, app)  
                }
            }) 

            app.action(`${C.id}`, async ctx => {
                if(C.correct == "false"){
                    this.#answer_id = ctx.reply("Wrong answer 🙅‍♂️")
                }else{
                    this.#result++
                    this.#answer_id = ctx.reply("Correct answer ✅")
                }
                this.#page++
                await this.deleteMassage(ctx, this.#message_id);
                setTimeout(async(e) => {
                    await this.deleteAnswer(ctx)
                } , 2000)
                if(this.#page > 20){
                    this.resultRespons(ctx);
                }else{
                    await this.findVariants(ctx, this.#page, app)  
                }
            }) 

            app.action(`${D.id}`, async ctx => {
                if(D.correct == "false"){
                    this.#answer_id = ctx.reply("Wrong answer 🙅‍♂️")
                }else{
                    this.#result++
                    this.#answer_id = ctx.reply("Correct answer ✅")
                }
                this.#page++
                await this.deleteMassage(ctx, this.#message_id);
                setTimeout(async(e) => {
                    await this.deleteAnswer(ctx)
                } , 2000)
                if(this.#page > 20){
                    this.resultRespons(ctx);
                }else{
                    await this.findVariants(ctx, this.#page, app)  
                }
            }) 


            return button;
        }



        async deleteMassage(ctx, messageId){
            await ctx.telegram.deleteMessage(ctx.chat.id, messageId).then().catch(err => {
                console.log("Error with delete", err)
            })
        }

        async deleteAnswer( ctx){
            await this.#answer_id.then(async i => {
                await ctx.telegram.deleteMessage(ctx.chat.id, i.message_id).then().catch(err => {
                    console.log("Deletde error: ", err, i.message_id);
                })
            })
        }

        async resultRespons(ctx){
            const result = this.#result;
            if(result >= 15){
                ctx.replyWithMarkdown(`Test completed, You result ${result} 🟢 *Very good* 👍`)
                return;
            }
            else if(result >= 10){
                ctx.replyWithMarkdown(`Test completed, You result ${result} 🟡 *Not bad* 🙂`)
                return;
            }
            else if(result < 10){
                ctx.replyWithMarkdown(`Test completed, You result ${result} 🔴 *You should learn more* 😔`)
                return;
            }
            else{
                ctx.reply("Finished")
                return;
            }
        }

}

module.exports = {Hears};