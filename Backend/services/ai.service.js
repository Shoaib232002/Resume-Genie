const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

module.exports.generateResult = async (prompt) => {
    if(!prompt){
        return {error: "Prompt is required"};
    }
    
    const result = await model.generateContent(prompt);
    return result.response.text()
}


