const {generateResulte} = require('../services/ai.service')

module.exports.generateAI_Result = async (req ,res) => {
    try {
        const {prompt}= req.query
        const result = await generateResulte(prompt)
        res.status(200).json(result);
    }catch(err){
        
    }

}