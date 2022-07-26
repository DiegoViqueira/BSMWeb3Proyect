// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;


import "@openzeppelin/contracts/access/Ownable.sol";
import "contracts/EstablishmentAudit.sol";

contract AuditManagement is Ownable{

   
   address[] private establishmentAudit;
   string[]  private establishmentIds; 
   mapping(string=>address) private addressEstablishments;
   

   /**
    * @dev Add an establishment to Audit
    */

   function AddEstablishment(string memory establishmentID ) public onlyOwner returns (bool success) {
		require(addressEstablishments[establishmentID] == address(0), "Establishment allready registered");
		address newEstablishment = address(new EstablishmentAudit(establishmentID,msg.sender));            
		establishmentAudit.push(newEstablishment);
      establishmentIds.push(establishmentID);
		addressEstablishments[establishmentID] = newEstablishment;
		return true;
    }
   

   /**
    * @dev Add  an Audit Record 
    */
  function registerAudit( string memory establishmentID , string memory documentId , string memory documentData ) public returns(bool) {
	 require(addressEstablishments[establishmentID] != address(0), "Could not register Audit Record because Establishment doesnt exist");
    EstablishmentAudit(addressEstablishments[establishmentID]).registerDocument(documentId,keccak256(bytes(documentData)),msg.sender);
    return true;
  }

  
   /**
    * @dev Audit Record 
    */
  function auditDocument( string memory establishmentID , string memory documentId ) public view  returns(bytes32) {
	 require(addressEstablishments[establishmentID] != address(0), "Establishment doesnt exist.");
    return EstablishmentAudit(addressEstablishments[establishmentID]).getDocumentContentHash(documentId);
   }

   /**
    * @dev List the Deployed Contracts
    */
   function getDeployedChildContracts() public view returns (address[] memory) {
      return establishmentAudit;
   }

  /**
    * @dev List all Establishments
    */
   function listEstablishments() public view returns (string[] memory) {
        return establishmentIds;
   }
}


