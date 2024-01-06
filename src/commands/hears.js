const {SqlService} = require("../lib/sql_service.js")
const sqlService = new SqlService();
const {uniqueRandomNumbers} = require("../lib/getRandomNumber.js")
const {Markup} = require("telegraf")
const {reply_button} = require("../commands/start.js")


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
 #page = 1;
 #result = 0;


    HearTestStart(app){
        app.hears("Tests 🎯", async(ctx) => {
            ctx.reply("Lets start tests 🏃‍♂️", reply_buttons)

            await this.ShowTests(1, app)
        })
        app.hears("Start testing", async(ctx) => {
            ctx.replyWithMarkdown(`*start 🚀*`, stop_button)
            await this.findVariants(ctx, this.#page, app);
            

        })
    }

        ShowTests(){
            this.#randomQuestions = [];

            // this function bring 20 random numbers from 1 to 100
             const randomNumbers = uniqueRandomNumbers(20, 1, 100);

            sqlService.getAllQuestions().then(data => {
                randomNumbers.forEach(element => {
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
                const messageFindId = ctx.replyWithMarkdown(`
                _${this.#page}/20_
*${page}.* ${this.#randomQuestions[page -1].title}?`, variantButtons)
                messageFindId.then(m => {
                    this.#message_id = m.message_id; 
                })
            })
        }



        makeVariantBurron(A, B, C, D, app, ctx){
            const button = Markup.inlineKeyboard([
                [Markup.button.callback(`A: ${A.variant_text}`, `${A.id}`)],
                [Markup.button.callback(`B: ${B.variant_text}`, `${B.id}`)],
                [Markup.button.callback(`C: ${C.variant_text}`, `${C.id}`)],
                [Markup.button.callback(`D: ${D.variant_text}`, `${D.id}`)]
            ])
        
            app.hears("Stop", (ctx) => {
                this.#page = 1;
                ctx.reply("Stoped", reply_button);
                
            })

            app.action(`${A.id}`, async(ctx) => {
                if(A.correct  == "false"){
                    ctx.reply("Wrong answer 🙅‍♂️").then(i => {
                         setTimeout(async (e) => {
                            await ctx.telegram.deleteMessage(ctx.chat.id, i.message_id).then().catch(err => {
                                console.log("Deletde error: ", err, i.message_id);
                            })
                        } , 2000)
                    })
                }else{
                    this.#result++
                    ctx.reply("Correct answer ✅").then(i => {
                        setTimeout(async (e) => {
                            await ctx.telegram.deleteMessage(ctx.chat.id, i.message_id).then().catch(err => {
                                console.log("Deletde error: ", err, i.message_id);
                            })
                        } , 2000)
                    })
                }
                    this.#page++
                    await this.deleteMassage(ctx, this.#message_id);
                    if(this.#page > 20){
                        this.resultRespons(ctx);
                    }else{
                        await this.findVariants(ctx, this.#page, app)  
                    }
                }) 

                app.action(`${B.id}`, async(ctx) => {
                    if(B.correct  == "false"){
                        ctx.reply("Wrong answer 🙅‍♂️").then(i => {
                             setTimeout(async (e) => {
                                await ctx.telegram.deleteMessage(ctx.chat.id, i.message_id).then().catch(err => {
                                    console.log("Deletde error: ", err, i.message_id);
                                })
                            } , 2000)
                        })
                    }else{
                        this.#result++
                        ctx.reply("Correct answer ✅").then(i => {
                            setTimeout(async (e) => {
                                await ctx.telegram.deleteMessage(ctx.chat.id, i.message_id).then().catch(err => {
                                    console.log("Deletde error: ", err, i.message_id);
                                })
                            } , 2000)
                        })
                    }
                        this.#page++
                        await this.deleteMassage(ctx, this.#message_id);
                        if(this.#page > 20){
                            this.resultRespons(ctx);
                        }else{
                            await this.findVariants(ctx, this.#page, app)  
                        }
                    }) 

                    app.action(`${C.id}`, async(ctx) => {
                        if(C.correct  == "false"){
                            ctx.reply("Wrong answer 🙅‍♂️").then(i => {
                                 setTimeout(async (e) => {
                                    await ctx.telegram.deleteMessage(ctx.chat.id, i.message_id).then().catch(err => {
                                        console.log("Deletde error: ", err, i.message_id);
                                    })
                                } , 2000)
                            })
                        }else{
                            this.#result++
                            ctx.reply("Correct answer ✅").then(i => {
                                setTimeout(async (e) => {
                                    await ctx.telegram.deleteMessage(ctx.chat.id, i.message_id).then().catch(err => {
                                        console.log("Deletde error: ", err, i.message_id);
                                    })
                                } , 2000)
                            })
                        }
                            this.#page++
                            await this.deleteMassage(ctx, this.#message_id);
                            if(this.#page > 20){
                                this.resultRespons(ctx);
                            }else{
                                await this.findVariants(ctx, this.#page, app)  
                            }
                        }) 

                        app.action(`${D.id}`, async(ctx) => {
                            if(D.correct  == "false"){
                                ctx.reply("Wrong answer 🙅‍♂️").then(i => {
                                     setTimeout(async (e) => {
                                        await ctx.telegram.deleteMessage(ctx.chat.id, i.message_id).then().catch(err => {
                                            console.log("Deletde error: ", err, i.message_id);
                                        })
                                    } , 2000)
                                })
                            }else{
                                this.#result++
                                ctx.reply("Correct answer ✅").then(i => {
                                    setTimeout(async (e) => {
                                        await ctx.telegram.deleteMessage(ctx.chat.id, i.message_id).then().catch(err => {
                                            console.log("Deletde error: ", err, i.message_id);
                                        })
                                    } , 2000)
                                })
                            }
                                this.#page++
                                await this.deleteMassage(ctx, this.#message_id);
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


        async resultRespons(ctx){
            const result = this.#result;
            if(result >= 15){
                ctx.replyWithMarkdown(`Test completed, Your result ${result} 🟢 *Very good* 👍`)
                this.#randomQuestions = [];
                    this.#message_id = ""
                    this.#page = 1;
                    this.#result = 0;
                return;
            }
            else if(result >= 10){
                ctx.replyWithMarkdown(`Test completed, Your result ${result} 🟡 *Not bad* 🙂`)
                this.#randomQuestions = [];
                    this.#message_id = ""
                    this.#page = 1;
                    this.#result = 0;
                return;
            }
            else if(result < 10){
                ctx.replyWithMarkdown(`Test completed, Your result ${result} 🔴 *You should learn more* 😔`)
                this.#randomQuestions = [];
                    this.#message_id = ""
                    this.#page = 1;
                    this.#result = 0;
                return;
            }
            else{
                ctx.reply("Finished")
                this.#randomQuestions = [];
                    this.#message_id = ""
                    this.#page = 1;
                    this.#result = 0;
                return;
            }
        }

}

module.exports = {Hears};