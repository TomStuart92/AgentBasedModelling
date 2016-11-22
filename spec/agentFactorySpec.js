'use strict';
var testData = 'Agent_Breed,Policy_ID,Age,Social_Grade,Payment_at_Purchase,Attribute_Brand,Attribute_Price,Attribute_Promotions,Auto_Renew,Inertia_for_Switch\nBreed_C,132802001.0,66,3,250,25.3,16.6,5.1,0,4\n';

describe("AgentFactory", function() {
  var agentFactory;
  var agentManager;
  var agent;
  beforeEach(function() {
    spyOn(window, "Agent");
    agentManager = { addAgent: function(value) {},
                     _recordState: function(value) {}};
    spyOn(agentManager, 'addAgent');

    agentFactory = new AgentFactory(agent, agentManager);
  });
  it('seeds AgentManager from local data', function(){
    agentFactory.seedData(testData);
    expect(agentManager.addAgent).toHaveBeenCalled();
  });
  it('creates Agents from local data', function(){
    agentFactory.seedData(testData);
    expect(Agent).toHaveBeenCalled();
  });
});
