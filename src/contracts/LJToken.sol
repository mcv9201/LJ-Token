// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract LJToken is ERC20, AccessControl{

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    address payable public owner;
    constructor(address payable _owner) ERC20("Loyalty Tokens","LJT"){
        owner = _owner;
    }

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }
    
    function setMintAccess(address seller) external onlyOwner{
        _setupRole(MINTER_ROLE, seller);
    }

    // 1 ether - 1,000,000 tokens
    function buyToken() payable external{
        require(hasRole(MINTER_ROLE, msg.sender),"You can't mint this token");
        uint amount = (1000*1000*msg.value )/ 10**18;
        _mint(msg.sender, amount);
        owner.transfer(msg.value);
    }

    function purchase(address seller, address buyer, uint amount) public {
        _transfer(seller, buyer, amount);
    }

    function transfer(address to,uint amount) public override returns(bool) {
        require(hasRole(MINTER_ROLE,msg.sender));
        _transfer(msg.sender,to, amount);
        return true;
    }

    function burnTokens(uint amount) external{
        require(balanceOf(msg.sender) >= amount);
        _burn(msg.sender, amount);
    }
}