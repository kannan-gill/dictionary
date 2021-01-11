import react from 'react';
import axios from 'axios';


class  App extends react.Component {

  constructor(props){
    super(props);
    this.state={
      words:[],
      i:0,
      word:"",
      meaning:"",
      synonym:"",
      use_sentence:""
    }
  }

  componentDidMount(){
    
    axios.get("http://localhost:80/")
      .then((res)=>{
        console.log(res.data);
        this.setState({
          words:res.data,
          i:0,
          word:"",
          meaning:"",
          synonym:"",
          use_sentence:""
        })
      })
      console.log("hello")
  }

  handleword=(e)=>{
   // console.log(e.target.value)
    this.setState({
      word:e.target.value
    })
  }

  handlemeaning=(e)=>{
    this.setState({
      meaning:e.target.value
    })
  }

  handlesynonym=(e)=>{
    this.setState({
      synonym:e.target.value
    })
  }

  handleuse=(e)=>{
    this.setState({
      use_sentence:e.target.value
    })
  }



  delete(id){
    axios.delete('http://localhost:80/'+id)
      .then(()=>{
        this.componentDidMount()
      })
  }

  edit=(id)=>{
    axios.get('http://localhost:80/'+id)
        .then((res)=>{
           this.setState({
             i:res.data._id,
             word:res.data.word,
             meaning:res.data.meaning,
             synonym:res.data.synonym,
             use_sentence:res.data.use_sentence
           })
        })
  }

  handlesubmit=(e,i)=>{
    e.preventDefault();
    if(i===0){
      axios.post('http://localhost:80/',{word:this.state.word,meaning:this.state.meaning,synonym:this.state.synonym,use_sentence:this.state.use_sentence})
        .then(()=>{
          this.componentDidMount()
        })
    }
    else{
      axios.put('http://localhost:80/'+i,{word:this.state.word,meaning:this.state.meaning,synonym:this.state.synonym,use_sentence:this.state.use_sentence})
        .then(()=>{
          this.componentDidMount()
        })
    }
    
    //console.log("hi")
  }

  render(){
    return (
    <div className="row pt-3">
      <div className="col s6">
        
    
        <form onSubmit={(e)=>this.handlesubmit(e,this.state.i)}>
          <div class="form-group">
            <label for="exampleInputEmail1">Word</label>
            <input value={this.state.word} onChange={this.handleword} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Meaning</label>
            <input  value={this.state.meaning} onChange={this.handlemeaning} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Synonym</label>
            <input value={this.state.synonym} onChange={this.handlesynonym} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Use sentence</label>
            <input value={this.state.use_sentence} onChange={this.handleuse} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
          </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        

      </div>
      <div className="col s6">
      {this.state.words.map(word=>{
        return(

          <div class="card">
            <div class="card-body">
              <h2 class="card-title">{word.word}</h2>
              <h4 class="card-title"><i>Meaning: {word.meaning}</i></h4>
              <h5 class="card-title">synonyms: {word.synonym}</h5>
              <p class="card-text">{word.use_sentence}</p>
              <button onClick={(e)=>this.edit(word._id)} href="#" class="btn btn-info mx-2">Edit</button>
              <button onClick={(e)=>this.delete(word._id)} href="#" class="btn btn-primary">Delete</button>
            </div>
          </div>



        )} 
      )}
      </div>
      
    </div>
    );
  }
  
}

export default App;
