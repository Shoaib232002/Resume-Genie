const {generateResult} = require('../services/ai.service')

module.exports.generateAI_Result = async (req ,res) => {
    try {
        const {prompt}= req.query
        const result = await generateResult(prompt)
        res.status(200).json(result);
    }catch(err){
        
    }

}