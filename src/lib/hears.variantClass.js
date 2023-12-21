const {Hears} = require("../commands/hears.js")
const AllHears = new Hears();
console.log(AllHears);


class VariantsClass{
    #answer_id;
    #result;
    #page;
    #message_id;
    constructor(app, later, answer_id, result, page, message_id){
        this.app = app;
        this.later = later
        this.#answer_id = answer_id;
        this.#result = result;
        this.#page = page
        this.#message_id = message_id;
    }
    async allVariants(){
        const app = this.app;

        await app.action(`${this.later.id}`, async ctx => {
            if(this.later.correct == "false"){
                this.#answer_id = ctx.reply("Wrong answer 🙅‍♂️")
            }else{
                this.#result++
                this.#answer_id = ctx.reply("Correct answer ✅")
            }
            this.#page++
            await AllHears.deleteMassage(ctx, this.#message_id);
            setTimeout(async(e) => {
                await AllHears.deleteAnswer(ctx)
            } , 2000)
            if(this.#page > 20){
                this.resultRespons(ctx);
            }else{
                await this.findVariants(ctx, this.#page, app)  
            }
        }) 
        
    }

}

module.exports = {VariantsClass};