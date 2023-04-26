const MintAccess = ({state,account})=>{

    const handleMintAccess=async(event)=>{
        event.preventDefault()
        try{
        const {contract} = state;
        const address = document.querySelector("#address").value;

        const tx = await contract.setMintAccess(address);
        tx.wait()
        alert("Mint Access Successful");
        
        }catch(error){
            alert(error.reason)
        }
    }
    return<>
    <h2>Only Owner can give the mint access</h2>

    <div className="container">
    <div className="card-container"></div>
    <div className="card">
            <label htmlFor="price">Address of the Company</label>
            <input type="string" id="address"></input>
            <button className="buyBtn" onClick={handleMintAccess}>Give Access</button>
        </div>
    </div>
    </>
}

export default MintAccess;