// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;


import "@openzeppelin/contracts/access/Ownable.sol";
import "contracts/EstablishmentAudit.sol";

contract AuditManagement is Ownable{

   
   address[] private establishmentAudit;
   mapping(string=>address) private addressEstablishments;
   
   
   function AddEstablishment(string memory establishmentID ) public onlyOwner returns (bool success) {
		require(addressEstablishments[establishmentID] == address(0), "Establishment allready registered");
		address newEstablishment = address(new EstablishmentAudit(establishmentID,msg.sender));            
		establishmentAudit.push(newEstablishment);   
		addressEstablishments[establishmentID] = newEstablishment;
		return true;
    }
   

   function getDeployedChildContracts() public view returns (address[] memory) {
      return establishmentAudit;
   }
}