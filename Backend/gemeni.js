// Make sure to include these imports:
require('dotenv').config()
const { GoogleGenerativeAI }= require("@google/generative-ai");
async function call (data){
    try{
        const genAI = new GoogleGenerativeAI(process.env.gemini_API);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        const prompt = "i am giving you this data in json format which is user's expense based on this provide insights which can imporve users's savings and giving advice in 3 points less than 20 words and as short as possible"+data;
    
        const result =await model.generateContent(prompt);
        // console.log(result.response.text());
        return result.response.text();
    }
    catch(err){
        console.log(err);
    }
} 

module.exports = {call}