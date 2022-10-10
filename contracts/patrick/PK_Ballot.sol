// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface IERC20Votes {
    function getPastVotes(address, uint256) external view returns (uint256);

    function mint(address to, uint256 amount) external;
}

contract PK_Ballot {
    uint256 public referenceBlock;
    IERC20Votes public tokenContract;

    struct Proposal {
        bytes32 name;
        uint256 voteCount;
    }

    Proposal[] public proposals;
    mapping(address => uint256) public votingPowerSpent;

    constructor(
        bytes32[] memory proposalNames,
        address _tokenContract,
        uint256 _referenceBlock
    ) {
        for (uint256 i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
        referenceBlock = _referenceBlock;
        tokenContract = IERC20Votes(_tokenContract);
    }

    function buyTokens() public payable {
        uint256 paymentReceived = msg.value;
        tokenContract.mint(msg.sender, paymentReceived);
    }

    function delegate(address to) external {
        //TODO
    }

    function vote(uint256 proposal, uint256 amount) external {
        uint256 _votingPower = getVotingPower(msg.sender);

        require(_votingPower >= amount, "Has not enough voting power to vote");

        votingPowerSpent[msg.sender] += amount;
        proposals[proposal].voteCount += amount;
    }

    function getVotingPower(address voter)
        internal
        view
        returns (uint256 votingPower_)
    {
        votingPower_ =
            tokenContract.getPastVotes(voter, referenceBlock) -
            votingPowerSpent[voter];
    }

    function winningProposal() public view returns (uint256 winningProposal_) {
        uint256 winningVoteCount = 0;
        for (uint256 p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}
