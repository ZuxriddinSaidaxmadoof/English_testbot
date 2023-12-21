const pool = require("../../database/index.js");


 class SqlService{
  
    async getAllUsers(){
        return pool.query("SELECT * FROM users;")
    }
    
    async createNewUser(dto){

            const newDataRow = {
                name: dto.name ,
                user_name: dto.user_name,
                user_id: dto.user_id,
              };
              
              const insertQuery = {
                text: 'INSERT INTO users (name, user_name, user_id) VALUES ($1, $2, $3) RETURNING *',
                values: [newDataRow.name, newDataRow.user_name, newDataRow.user_id],
              };

              return pool.query(insertQuery);              

    }

    async getAllQuestions(){
      return pool.query("SELECT * FROM questions;")
  }

    async getAllVariants(){
      return pool.query("SELECT * FROM variants;")
    }

}

module.exports = {SqlService}
