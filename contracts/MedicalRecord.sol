//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MedicalRecord {
    uint public recordId;
    mapping(uint => Record) records;
    mapping(uint => bool) public isDeleted;
    struct Record {
        uint recordId;
        uint timestamp;
        string name;
        uint age;
        string gender;
        string bloodType;
        string allergies;
        string diagnosis;
        string treatment;
    }

    event MedicalRecords__AddRecord(
        uint recordId,
        uint timestamp,
        string name,
        uint age,
        string gender,
        string bloodType,
        string allergies,
        string diagnosis,
        string treatment
    );

    event MedicalRecords__DeleteRecord(
        uint recordId,
        uint timestamp,
        string name,
        uint age,
        string gender,
        string bloodType,
        string allergies,
        string diagnosis,
        string treatment
    );

    function addRecord(
        string memory _name,
        uint _age,
        string memory _gender,
        string memory _bloodType,
        string memory _allergies,
        string memory _diagnosis,
        string memory _treatment
    ) public {
        recordId++;
        records[recordId] = Record(
            recordId,
            block.timestamp,
            _name,
            _age,
            _gender,
            _bloodType,
            _allergies,
            _diagnosis,
            _treatment
        );
        emit MedicalRecords__AddRecord(
            recordId,
            block.timestamp,
            _name,
            _age,
            _gender,
            _bloodType,
            _allergies,
            _diagnosis,
            _treatment
        );
    }

    function deleteRecord(uint256 _recordId) public {
        require(!isDeleted[_recordId], "Record already deleted");
        Record storage record = records[_recordId];
        emit MedicalRecords__DeleteRecord(
            record.recordId,
            block.timestamp,
            record.name,
            record.age,
            record.gender,
            record.bloodType,
            record.allergies,
            record.diagnosis,
            record.treatment
        );
        isDeleted[_recordId] = true;
    }

    function getRecord(
        uint _recordId
    )
        public
        view
        returns (
            uint,
            string memory,
            uint,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        Record storage record = records[_recordId];
        return(
            record.timestamp,
            record.name,
            record.age,
            record.gender,
            record.bloodType,
            record.allergies,
            record.diagnosis,
            record.treatment
        );
    }

    function getRecordId() public view returns (uint) {
        return recordId;
    }

    function getTimestamp(uint _recordId) public view returns (uint) {
        return records[_recordId].timestamp;
    }

    function getName(uint _recordId) public view returns (string memory) {
        return records[_recordId].name;
    }

    function getAge(uint _recordId) public view returns (uint) {
        return records[_recordId].age;
    }

    function getGender(uint _recordId) public view returns (string memory) {
        return records[_recordId].gender;
    }

    function getBloodType(uint _recordId) public view returns (string memory) {
        return records[_recordId].bloodType;
    }

    function getAllergies(uint _recordId) public view returns (string memory) {
        return records[_recordId].allergies;
    }

    function getDiagnosis(uint _recordId) public view returns (string memory) {
        return records[_recordId].diagnosis;
    }

    function getTreatment(uint _recordId) public view returns (string memory) {
        return records[_recordId].treatment;
    }

    function getDeleted(uint _recordId) public view returns (bool) {
        return isDeleted[_recordId];
    }
}
