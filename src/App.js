import abi from './contracts/LJToken.json';
import { useState,useEffect } from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BuyToken from './pages/BuyToken';
import Purchase from './pages/Purchase';
import MintAccess from './pages/MintAccess';

const ethers = require("ethers");

function App() {
  const [state,setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  // const [contractAddress,setContractAddress] = useState("None")
  const [account,setAccount] = useState("None")
  const [balance,setBalance] = useState("NA")

  const updateBalance = (newBalance) => {
    setBalance(newBalance);
    window.location.reload()
    setTimeout(1000)
    window.location.reload()
  };
  
  useEffect(() => {
      const connectWallet = async ()=>{
        const contractAddress = "0x28c124a91D95e92f40A88dfE581B5ac53Abc95a4";
        const contractABI = abi.abi;
        try{
          const {ethereum} = window;
          
          if(ethereum){
            const account = await ethereum.request({method:"eth_requestAccounts"});
            window.ethereum.on("chainChanged",()=>{
              window.location.reload()
            })
            window.ethereum.on("accountsChanged",()=>{
              window.location.reload()
            })
            console.log(account)
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
            )
          setState({provider,signer,contract});
          setAccount(account)   
          // setContractAddress(contractAddress)
          const tokenBalance = await contract.balanceOf(account[0])
          setBalance(tokenBalance.toNumber()) 
          console.log(balance)
          }else{
            alert("Please Install Metamask!!")
          }
          
        } catch(error){
          console.log(error)
        }
      }
      connectWallet();
  },[balance])

  // console.log(state);
  
  return (
    // <div className="App">
    //   <p>Connected Account - {account}</p>
    //   <Purchase state={state}></Purchase>
    //  <BuyToken state={state}></BuyToken>
    // </div>
  <div>
  <p>Connected Account - {account}</p>
  <p>LJ Token Balance - {balance}</p>
  <Router>
  <Navbar />
  <Routes>
    <Route path='/' element={<Purchase state={state} account={account} updateBalance={updateBalance}/>} />
    <Route path='/BuyToken' element={<BuyToken state={state} account={account} updateBalance={updateBalance}/>}/>
    <Route path='/MintAccess' element={<MintAccess state={state} account={account}/>}/>
  </Routes>
  </Router>

  </div>
  
  );
}

export default App;
