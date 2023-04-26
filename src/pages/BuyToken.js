const {ethers} = require("ethers")

const BuyToken = ({state,account,updateBalance})=>{

    const handleBuyToken = async(event)=>{
        event.preventDefault()
        try{
        const {contract} = state;
        const amount = document.querySelector("#amount").value;
        const amountInEth = await ethers.utils.parseEther(amount);
        console.log(amountInEth, contract)

        // const gasPrice = signer.gasPrice();
        // const gasLimit = contract.estimateGas.buyToken({value:amountInEth});
        const tx = await contract.buyToken({value:amountInEth});
        tx.wait()
        const newBalance = await contract.balanceOf(account[0])
        console.log("Transaction Successful");
        updateBalance(newBalance.toNumber());
        setTimeout(3000)
        alert("Mint Token Successful");
        
        }catch(error){
            alert(error.reason)
        }
    }
    return <>
    {/* <div class="input-container">
    <input type="number" placeholder="Amount in Ether"></input>
    </div>
    <div class="btn-container">
    <button onClick={handleBuyToken} class="buy-btn">Buy Token</button>
    </div> */}
    <h2>Only Companies can mint the Token</h2>

    <div className="container">
    <div className="card-container"> 
    </div>
    <div className="card">
            <label htmlFor="price">Amount in Ether</label>
            <input type="number" id="amount"></input>
            <button className="buyBtn" onClick={handleBuyToken}>Buy</button>
        </div>
    
    </div>
    </>
}

export default BuyToken;