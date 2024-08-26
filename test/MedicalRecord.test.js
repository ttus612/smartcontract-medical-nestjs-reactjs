const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MedicalRecord", () => {
  let medical, user1, transactionResponse, transactionReceipt;
  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    user1 = accounts[1];
    const Medical = await ethers.getContractFactory("MedicalRecord");
    medical = await Medical.connect(user1).deploy();
  });

  describe("Deployment", () => {
    it("The contract is deployed successfully", async () => {
      expect(await medical.address).to.not.equal(0);
    });
  });

  describe("addRecord", () => {
    beforeEach(async () => {
      transactionResponse = await medical
        .connect(user1)
        .addRecord(
          "Waston",
          32,
          "Male",
          "B Positive",
          "Dengue",
          "Dengue",
          "Dengue"
        );
        transactionReceipt = await transactionResponse.wait();
    });
    it("Emits add record event", async () => {
        const event = await transactionReceipt.logs[0];
        expect(event.fragment.name).to.equal("MedicalRecords__AddRecord");
        const args = event.args;
        expect(args.timestamp).to.not.equal(0);
        expect(args.name).to.equal("Waston"); 
        expect(args.age).to.equal(32);
        expect(args.gender).to.equal("Male"); // Update here
        expect(args.bloodType).to.equal("B Positive"); // Update here
        expect(args.allergies).to.equal("Dengue"); // Update here
        expect(args.diagnosis).to.equal("Dengue"); // Update here
        expect(args.treatment).to.equal("Dengue"); // Update here
    });
    it("The getRecords function is working", async () => {
        const [
            timestamp,
            name,
            age,
            gender,
            bloodType,
            allergies,
            diagnosis,
            treatment,
        ] = await medical.getRecord(1);
        expect(name).to.equal("Waston");
        expect(timestamp).to.not.equal(0);
        expect(age).to.equal(32);
        expect(gender).to.equal("Male");
        expect(bloodType).to.equal("B Positive");
        expect(allergies).to.equal("Dengue");
        expect(diagnosis).to.equal("Dengue");
        expect(treatment).to.equal("Dengue");
    });
  });

  describe("The delete function is working",() => {
    beforeEach(async () => {
        transactionResponse = await medical.addRecord(
            "Wastron",
            22,
            "Male",
            "B positive",
            "Dengue",
            "Dengue",
            "Dengue"
        );
        transactionReceipt = await transactionResponse.wait();
        transactionResponse = await medical.deleteRecord(1);
        transactionReceipt = await transactionResponse.wait();
      });
      it("The record is deleted ", async () => {
        expect(await medical.getDeleted(1)).to.be.equal(true);
      });
      it("Emits a delete event", async () => {
        const event = await transactionReceipt.logs[0];
        const args = event.args;
        expect(event.fragment.name).to.equal("MedicalRecords__DeleteRecord");
        expect(args.timestamp).to.not.equal(0);
        expect(args.name).to.equal("Wastron");
        expect(args.age).to.equal(22);
        expect(args.gender).to.equal("Male");
        expect(args.bloodType).to.equal("B positive");
        expect(args.allergies).to.equal("Dengue");
        expect(args.diagnosis).to.equal("Dengue");
        expect(args.treatment).to.equal("Dengue");
      });
  });
});
