var AgentManager = require('../lib/agentManager')
'use strict';

describe("AgentManager", function() {
  var agentManager;
  var agent;
  var breedFactor = 1.5;

  beforeEach(function() {
    agentManager = new AgentManager();
    agent = { setBar: function(value) {bar = value}};
    spyOn(agent, 'setBar');
  })

  it('adds agents to memory',function(){
    agentManager.addAgent(agent);
    expect(agentManager._agents).toContain(agent);
  })

  it('sets breedFactor',function(){
    agentManager.setBreedFactor(breedFactor);
    expect(agentManager._breedFactor).toEqual(breedFactor);
  })


});
