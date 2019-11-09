const RepContract = artifacts.require("./RepContract.sol");

contract("SimpleStorage", accounts => {
  it("...should get the rep for account 1.", async () => {
    const repContractInstance = await RepContract.deployed();

    // Set value of 89
    await repContractInstance.setRep(accounts[0], 0, 89, { from: accounts[0] });

    // Get stored value
    const storedRep = await repContractInstance.getRepValue(0,accounts[0]);

    assert.equal(storedRep, 89, "The value 89 was not stored.");
  });

});
