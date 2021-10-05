import React from 'react';
import assigner from "./script"

class Garage extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    available:[
        [0,1],
        [0,1,2,3,4],
        [0,1,2,3,4],
        [0,1,2],
        [0,1,2,3,4],
        [0,1,2]
    ],
    display: '0',
    value:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  replace(array, new_array){
    array = new_array;
    return array;
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState((state) => {
        state.available = res
        return state;
      }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/available');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    let ar = [[],[],[],[],[],[]];
    for(let i in body.data){
     if(!body.data[i].TAKEN) ar[body.data[i].ROW]?.push(body.data[i].COL);
   }
    return ar;
  };
  
  handleSubmit = async e => {
    let location = assigner(this.state.available,this.state.value);
    this.setState((state) =>{
      state.available[location.row]=state.available[location.row]?.filter(spaces => spaces !== location.col)
      return state.available[location.row];
    });
    e.preventDefault();
    const response = await fetch('/api/assigned', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({location: location } ),
    });
    const body = await response.text();
    
  };

  colorParking(location){
    if(this.state.available[location[0]].includes(location[1])){
        return ""
    }
    return "taken"
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  reset(event){
   fetch('/api/reset');
   window.location.reload(false);
  }

  render() {
    return (
        <div>
             <div className="column left">
                <form onSubmit={this.handleSubmit}>
                    <h2>Pick your Building</h2>
                    <input type="text" name="name" value={this.state.value} onChange={this.handleChange}/>
                    <button>Enter</button>
                </form>
                <button onClick={this.reset}>Reset</button>
            </div>
            <div className="column right garage-container">
                <div className="garage">
                    <div className="garage-buttons">
                        <button  className=" spacers" >A1</button>
                        <button className={this.colorParking([0,0])} ></button>
                        <button className={this.colorParking([0,1])}  ></button>
                        <button className="spacers" ></button>
                        <button className="spacers" ></button>
                        <button className="spacers" ></button>
                        <button className="spacers" >A2</button>
                        <button className="spacers" >B1</button>
                        <button className={this.colorParking([1,0])}  ></button>
                        <button className={this.colorParking([1,1])}  ></button>
                        <button className={this.colorParking([1,2])}  ></button>
                        <button className={this.colorParking([1,3])}  ></button>
                        <button className={this.colorParking([1,4])}  ></button>
                        <button className="spacers" >B2</button>
                        <button className="spacers" >C1</button>
                        <button className={this.colorParking([2,0])}  ></button>
                        <button className={this.colorParking([2,1])}  ></button>
                        <button className={this.colorParking([2,2])}  ></button>
                        <button className={this.colorParking([2,3])}  ></button>
                        <button className={this.colorParking([2,4])}  ></button>
                        <button className="spacers" >C2</button>
                        <button className="spacers" >D1</button>
                        <button className={this.colorParking([3,0])}  ></button>
                        <button className={this.colorParking([3,1])}  ></button>
                        <button className={this.colorParking([3,2])}  ></button>
                        <button className="spacers" ></button>
                        <button className="spacers" ></button>
                        <button className="spacers" >D2</button>
                        <button className="spacers" ></button>
                        <button className={this.colorParking([4,0])}  ></button>
                        <button className={this.colorParking([4,1])}  ></button>
                        <button className={this.colorParking([4,2])}  ></button>
                        <button className={this.colorParking([4,3])}  ></button>
                        <button className={this.colorParking([4,4])}  ></button>
                        <button className="spacers" ></button>
                        <button className="spacers" >F1</button>
                        <button className={this.colorParking([5,0])}  ></button>
                        <button className={this.colorParking([5,1])}  ></button>
                        <button className={this.colorParking([5,2])}  ></button>
                        <button className="spacers" ></button>
                        <button className="spacers" ></button>
                        <button className="spacers" >F2</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}


export default Garage;