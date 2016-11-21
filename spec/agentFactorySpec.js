'use strict';

describe("AgentFactory", function() {
  var agentFactory;
  var agentManager;
  var agent;

  beforeEach(function() {
    agent = function Agent(){};
    agentManager = { addAgent: function(value) {agent = value}};
    spyOn(agentManager, 'addAgent');

    agentFactory = new AgentFactory(agent, agentManager)
  })

  // it('seeds AgentManager with Agents', function(){
  //   agentFactory.seedData('./data/testData.csv')
  //   expect(AgentManager.addAgent).toHaveBeenCalled();
  // })

});
