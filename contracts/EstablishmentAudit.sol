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