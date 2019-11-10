import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import RepContract from "./contracts/RepContract.json";
import getWeb3 from "./utils/getWeb3";
import {Input, InputNumber, Button, Select} from 'antd'; //Select for handlechange
import "./App.css";
const {Option} = Select;

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, categoryIndex: 0, repOnBlockchain: 0, rating: 0 };
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


  catIndex(defaultValue) {
    console.log(`selected ${defaultValue}`);
  }


  buttonClicked = async () => {
    const { accounts, repContract } = this.state;

    console.log(this.state.addressOfUserToRate + "will be rated " + this.state.rating);
    await repContract.methods.setRep(this.state.addressOfUserToRate, this.state.categoryIndex, this.state.rating);
    const response = await repContract.methods.getRepValue(this.state.categoryIndex, this.state.addressOfUserToRate).call();

    // Update state with the result.
    this.setState({ repOnBlockchain: response });
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App" >
        <img src="./assets/space-img.jpg" alt="" />
        <h1 className="App-font" style={{color: "white", fontSize: "50pt"}}>UnRep</h1>
        <h3 className="App-font" style={{color: "blue", fontSize: "30pt"}}>Current Rep on Blockchain</h3>
    <h1 className="App-font" style={{color: "green", fontSize: "40pt"}}>{this.state.repOnBlockchain}</h1>
        <Input style={{width: "50%"}} placeholder="Address of user to rate" type="text" onChange={event => {this.setState({addressOfUserToRate: event.target.value})}} />
        <br />
        <span style={{color: "white"}}>Category:</span>
        <Select defaultValue="Programming">
          <Select.Option value="Programming">Programming</Select.Option>
          <Select.Option value="Credit">Credit</Select.Option>
          <Select.Option value="Driving">Driving</Select.Option>
        </Select>
        <br />
        <span style={{color: "white"}}>Reputation score out of 100:</span>
        <InputNumber min={1} max={100} style={{width: "50%"}}  onChange={value => {this.setState({rating: value})}} />
        <br />
        <Button onClick={this.buttonClicked}>Submit Rep</Button>
      </div>
    );
  }
}

export default App;
