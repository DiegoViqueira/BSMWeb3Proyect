const assert = require('assert');
const util = require("ethereumjs-util");
const ganache = require('ganache-cli');
const options = { gasLimit: 8000000 };
const Web3 = require('web3');  //Web3 en mayuscula porque es el constructor
const web3 = new Web3(ganache.provider(options));  //Crea instancia web3
const AuditABI = require ('../build/contracts/AuditManagement.json');
const EstablishmentAuditABI = require ('../build/contracts/EstablishmentAudit.json');

let accounts;
let auditContract;
let establishmentContract;
let owner;
let clientAccount;

describe('Audit Management tests', () => {
	
	before( async() => {  
		accounts = await web3.eth.getAccounts();
        this.owner = accounts[0];
        this.clientAccount=  accounts[1];
        auditContract = await new web3.eth.Contract(AuditABI.abi)
			.deploy({data: AuditABI.bytecode, arguments: []})
			.send({ from: this.owner, gas: 7000000 });
		
		console.log('contract address:'+auditContract.options.address);
	} );


	
	it('Register Establishment', async () => {
	
        const establishmentToRegister="PRUEBA";
        await auditContract.methods.AddEstablishment(establishmentToRegister, this.clientAccount).send({
        from: this.owner , gas: 7000000}).on('transactionHash', function(transactionHash){ })
        .then(function(receipt){ });

        const establishmentID= await auditContract.methods.getStablishmentID( this.clientAccount).call()    
        
        assert.equal(establishmentToRegister,establishmentID);
        
	});

	
    it('Register Establishment Same establishment Twice Should Fail', async () => {
	
        try { 
            const establishmentToRegister="PRUEBA";
            await auditContract.methods.AddEstablishment(establishmentToRegister,this.clientAccount).send({
                from: this.owner , gas: 7000000}).on('transactionHash', function(transactionHash){ })
                .then(function(receipt){ });

            assert.fail(new TypeError('Cant register Establishment Twice'));

        }
		catch (error) {
        	assert(error.message != "Cant register Establishment Twice"	);
		}
    
    });

    
    it('Register Document', async () => {
	
        const establishment="PRUEBA";
        const documentID ="PRUEBA";
        const docuemtnHash = util.keccakFromString("KKKKKKKKKKKKKKKKK")
        
        await auditContract.methods.registerAudit(establishment,documentID,docuemtnHash).send({
            from: this.clientAccount , gas: 7000000}).on('transactionHash', function(transactionHash){ })
            .then(function(receipt){ });

        const registeredHash =  await auditContract.methods.auditDocument(establishment,documentID).call();
        assert.equal(registeredHash,'0x' + docuemtnHash.toString('hex'));

      
    });


    
    it('Register Document thice should Fail', async () => {
	
        try { 
            const establishment="PRUEBA";
            const documentID ="PRUEBA";
            const docuemtnHash = util.keccakFromString("KKKKKKKKKKKKKKKKK")
            
            await auditContract.methods.registerAudit(establishment,documentID,docuemtnHash).send({
                from: this.clientAccount , gas: 7000000}).on('transactionHash', function(transactionHash){ })
                .then(function(receipt){ });
    
            assert.fail(new TypeError('Cant register Document Twice'));

        }
        catch (error) {
            assert(error.message != "Cant register Document Twice"	);
        }    
    });


    it('Register Document from not Owner Account Should Fail', async () => {
        try{    
            const establishment="PRUEBA";
            const documentID ="PRUEBA2";
            const docuemtnHash = util.keccakFromString("KKKKKKKKKKKKKKKKK")
            
            await auditContract.methods.registerAudit(establishment,documentID,docuemtnHash).send({
                from: this.owner , gas: 7000000}).on('transactionHash', function(transactionHash){ })
                .then(function(receipt){ });

         
            assert.fail(new TypeError('Cant register Document Twice'));

        }
        catch (error) {
            assert(error.message != "Cant register Document from not owner account"	);
            assert(error.message == 'VM Exception while processing transaction: revert Only owner can register a Document');
        }    

      
    });


	
});


