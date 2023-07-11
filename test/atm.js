const { expect } = require("chai");

describe("ATM Contract", function () {
  let ATM;
  let atm;
  let owner;
  let alice;

  before(async function () {
    ATM = await ethers.getContractFactory("ATM");
  });

  beforeEach(async function () {
    [owner, alice] = await ethers.getSigners();

    atm = await ATM.deploy();
    await atm.deployed();
  });

  it("Should deposit funds", async function () {
    const depositAmount = ethers.utils.parseEther("1.0");
    await atm.deposit({ value: depositAmount });

    const balance = await atm.getBalance();
    expect(balance).to.equal(depositAmount);
  });

  it("Should withdraw funds", async function () {
    const depositAmount = ethers.utils.parseEther("2.0");
    await atm.deposit({ value: depositAmount });

    const withdrawAmount = ethers.utils.parseEther("1.0");
    await atm.withdraw(withdrawAmount);

    const balance = await atm.getBalance();
    expect(balance).to.equal(depositAmount.sub(withdrawAmount));
  });

  it("Should not allow withdrawal if balance is insufficient", async function () {
    const depositAmount = ethers.utils.parseEther("0.5");
    await atm.deposit({ value: depositAmount });

    const withdrawAmount = ethers.utils.parseEther("1.0");
    await expect(atm.withdraw(withdrawAmount)).to.be.revertedWith(
      "Insufficient balance"
    );
  });

  it("Should get the balance of an account", async function () {
    const depositAmount = ethers.utils.parseEther("1.5");
    await atm.deposit({ value: depositAmount });

    const balance = await atm.getBalance();
    expect(balance).to.equal(depositAmount);
  });
});
