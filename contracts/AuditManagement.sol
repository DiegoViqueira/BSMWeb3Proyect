// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;


import "@openzeppelin/contracts/access/Ownable.sol";

contract EstablishmentAudit is Ownable{

   
  /**
    * @dev Establishment Identifier, name or CIF or Whatever
    *  
    */
  string public EstablishmentId;

  // Mapping from Document Id as string representation to Hash of Document content
  mapping(string=>bytes32) public AuditLogs;
   
 
  constructor (string memory _establishmentId, address owner) {
      EstablishmentId = _establishmentId;
      transferOwnership(owner);
  }
  
  /**
    * @dev Register a document into the Audit
    *  
    */
  function registerDocument(string memory documentId , bytes32 documentHash , address contractOwner) public returns(bool) {
    require(  owner() == contractOwner ,  "Only owner can register a Document");
	  require(  AuditLogs[documentId] == 0 ,  "Document allready registered");
    AuditLogs[documentId] = documentHash;
    return true;
  }
	
	
  /**
    * @dev Retrieve the hash of a document content for a specific Document Id
    *  
    */
	function getDocumentContentHash(string memory documentId ) public view returns(bytes32) {
      require( AuditLogs[documentId] != 0,  "Document doesnt exist");
		  return AuditLogs[documentId];
    }
	
}


contract AuditManagement is Ownable{

   
   address[] private establishmentAudit;
   string[]  private establishmentIds; 
   mapping(string=>address) private addressEstablishments;
   mapping(address=>string) private addressIDEstablishments;

   /**
    * @dev Add an establishment to Audit
    */

   function AddEstablishment(string memory establishmentID ,address owner ) public onlyOwner returns (bool success) {
		require(addressEstablishments[establishmentID] == address(0), "Establishment allready registered");
		address newEstablishment = address(new EstablishmentAudit(establishmentID,msg.sender));            
		establishmentAudit.push(newEstablishment);
      establishmentIds.push(establishmentID);
		addressEstablishments[establishmentID] = newEstablishment;
      addressIDEstablishments[owner] = establishmentID;
		return true;
    }
   

   /**
    * @dev Get establishment Id for a address
    */
   function getStablishmentID(address owner ) public view returns (string memory) {
        return addressIDEstablishments[owner];
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


