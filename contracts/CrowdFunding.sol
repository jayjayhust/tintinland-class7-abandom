// SPDX-License-Identifier: GPL-3.0

// 创建不同的募资活动，用来募集以太坊
// 记录相应活动下的募资总体信息（参与人数，募集的以太坊数量），以及记录参与的用户地址及投入的资金数量
// 业务逻辑包括：新建募集活动，用户参与募集活动，活动结束后进行资金领取
pragma solidity >=0.8.2 <0.9.0;


contract CrowdFunding {
    address immutable owner; // 记录合约部署者的地址

    struct Campaign {
        address payable receiver;
        uint numFunders;
        uint fundingGoal;
        uint totalRaisedAmount;
    }

    struct Funder {
        address addr;
        uint256 amount;
    }

    uint public numCampaigns;
    mapping(uint => Campaign) campaigns;
    mapping(uint => Funder[]) funders;
    mapping(uint => mapping(address => bool)) public isPaticipated;

    constructor() {
        owner = msg.sender;
    }

    modifier judgePaticipate(uint CampaignID) {
        require(isPaticipated[CampaignID][msg.sender] == false);
        _; // 通过，则继续执行函数内容
    }

    modifier isOwner() {
        require(msg.sender == owner);
        _;        
    }

    function newCampaign(address payable receiver, uint goal) external isOwner() returns (uint CampaignID) {
        CampaignID = numCampaigns++;
        Campaign storage c = campaigns[CampaignID];
        c.receiver = receiver;
        c.fundingGoal = goal;
    }

    // 本方法需要接收以太坊，所以需要payable修饰
    function bid(uint CampaignID) external payable judgePaticipate(CampaignID) { // modifier的参数已经在函数定义时进行了定义
        Campaign storage c = campaigns[CampaignID];
        c.totalRaisedAmount += msg.value;
        c.numFunders += 1;

        funders[CampaignID].push(Funder({
            addr: msg.sender,
            amount: msg.value
        }));
        isPaticipated[CampaignID][msg.sender] = true;
    }

    function withdraw(uint CampaignID) external returns (bool reached) {
        Campaign storage c = campaigns[CampaignID];

        if(c.totalRaisedAmount < c.fundingGoal)
            return false;
        
        uint amount = c.totalRaisedAmount;
        c.totalRaisedAmount = 0;
        c.receiver.transfer(amount); // receiver已经添加了payable修饰，所以可以调用transfer

        return true;
    }
}