import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import RepContract from "./contracts/RepContract.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };
  constructor(props){
    super(props);
  this.buttonClicked = this.buttonClicked.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];

      // const instance = new web3.eth.Contract(
      //   SimpleStorageContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      const repContract = new web3.eth.Contract(
        RepContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, repContract });//, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };
  buttonClicked() {
    console.log("click");
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App" >
     
          <img src="./assets/space-img.jpg" class="stretch" alt="" />
        
        <h1 className="App-font" style={{color: "white", fontSize: "50pt"}}>UnRep</h1>
        <input placeholder="Address of user to rate" type="text" />
        <br />
        <select>
          <option value="driving">Driving</option> 
        </select>
        <br />
        <input placeholder="Rep Score" type="text" />
        <br />
        <button onClick={this.buttonClicked}>Submit Rep</button>
      
        {/* <div>The stored value is: {this.state.storageValue}</div> */}
      </div>
    );
  }
}

export default App;
