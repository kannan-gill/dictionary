const mongoose=require('mongoose');
const Schema=mongoose.Schema;

newSchema=new Schema({
    word: String,
    meaning: String,
    synonym: String,
    use_sentence:String
})

module.exports=mongoose.model('Word',newSchema);