const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const Word=require('./models/index');


mongoose.connect('mongodb+srv://kannan:mango@cluster0.yunra.mongodb.net/words?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true});
const port=process.env.PORT|80;

const app=express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    Word.find({},(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(data);
        }
    })
})

app.get('/:id',(req,res)=>{
    var id=req.params.id;
    Word.findById(id,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(data);
        }
    })
})

app.delete('/:id',async (req,res)=>{
    var id=req.params.id;
    Word.findByIdAndDelete(id,(err)=>{
        if(err){
            console.log(err);
        }
    })
    console.log("del");
    res.json({'word' : 'deleted'});
})

app.post('/',(req,res)=>{
    word = new Word({
        word:req.body.word,
        meaning: req.body.meaning,
        synonym: req.body.synonym,
        use_sentence:req.body.use_sentence
    })

    word.save(()=>{
        res.json(word);
    })

})

app.put('/:id',async(req,res)=>{
    await Word.findByIdAndUpdate(req.params.id,req.body)
    res.json({'word':'updated'})
})




app.listen(port);
