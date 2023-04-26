import {useState,useEffect} from "react"

const Purchase = ({state,account,updateBalance}) => {
    //eslint-disable-next-line
    const sellerAddress= ["0xaB53D5C809cB33ad8680F32371FDAD168E1Fc821","0x7f00C5f65428F9FD4C751672B0579b54e68b302B","0x586fd0273FafDE9b4757ba49631dd96A292d095b","0x77ffbe846098c53b6Ef3134f13FcF5Eb46624532"]
    const [balances,setBalances] = useState([])
    const [prices, setPrices] = useState([0, 0, 0, 0]);

    const handlePriceChange = (event, id) => {
        event.preventDefault()
        const newPrices = [...prices];
        newPrices[id] = event.target.value;
        setPrices(newPrices);
    };

    const handlePurchase = async(event,id)=>{
        event.preventDefault()
        const {contract,signer} = state;
        const price = prices[id]
        console.log(price, contract, signer)

        const transaction = await contract.purchase(sellerAddress[id], account[0],price);
        await transaction.wait()
        const newBalance = await contract.balanceOf(account[0])
        updateBalance(newBalance.toNumber())
        alert("Token Purchase Successful");
        console.log("Transaction Successful");  
        window.location.reload(); 
    }

    useEffect(() => {
        const getBalance = async ()=>{
          try{
            const {ethereum} = window;
            
            if(ethereum){
            const {contract} = state

            const balancePromises = sellerAddress.map((address) =>
                contract.balanceOf(address)
            );
            const bal = await Promise.all(balancePromises);
            const balances = bal.map((blnc)=>blnc.toNumber())
            setBalances(balances);

            }else{
              alert("Please Install Metamask!!")
            }
            
          } catch(error){
            console.log(error.reason)
          }
        }
        getBalance();
    },[sellerAddress,state])
    return <>

    <div className="container">
    <div className="card-container">
        <div className="card">
            <h2>Company A</h2>
            <label htmlFor="qtyA">Price</label>
            <input type="number" id="price" value={prices[0]}
              onChange={(event) => handlePriceChange(event, 0)}></input>
            <button className="buyBtn" onClick={(event)=>handlePurchase(event,0)}>Buy/Claim</button>
            <p>LJT Balance - {balances[0]}</p>
        </div>
        <div className="card">
        <h2>Company B</h2>
            <label htmlFor="qtyB">Price</label>
            <input type="number" id="price" value={prices[1]}
              onChange={(event) => handlePriceChange(event, 1)}></input>
            <button className="buyBtn" onClick={(event)=>handlePurchase(event,1)}>Buy/Claim</button>
            <p>LJT Balance - {balances[1]}</p>
        </div>
        <div className="card">
            <h2>Company C</h2>
            <label htmlFor="qtyC">Price</label>
            <input type="number" id="price" value={prices[2]}
              onChange={(event) => handlePriceChange(event, 2)}></input>
            <button className="buyBtn" onClick={(event)=>handlePurchase(event,2)}>Buy/Claim</button>
            <p>LJT Balance - {balances[2]}</p>
        </div>
        <div className="card">
            <h2>Company D</h2>
            <label htmlFor="qtyD">Price</label>
            <input type="number" id="price" value={prices[3]}
              onChange={(event) => handlePriceChange(event, 3)}></input>
            <button className="buyBtn" onClick={(event)=>handlePurchase(event,3)}>Buy/Claim</button>
            <p>LJT Balance - {balances[3]}</p>
        </div>
    </div>
    </div>
   
    </>
}

export default Purchase;