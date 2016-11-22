'use strict';

describe("AgentManager", function() {
  var agentManager;
  var agent;
  var brandFactor = 1.5;

  beforeEach(function() {
    agentManager = new AgentManager();
    agent = { tick: function(value) {}, statusUpdate: function(){ return 'Breed_C';}};
    spyOn(agent, 'tick');
  });

  it('adds agents to memory',function(){
    agentManager.addAgent(agent);
    expect(agentManager._agents).toContain(agent);
  });

  it('sets brandFactor',function(){
    agentManager.setBrandFactor(brandFactor);
    expect(agentManager._brandFactor).toEqual(brandFactor);
  });

  describe('#tick',function(){
    beforeEach(function() {
      agentManager.addAgent(agent);
      agentManager.setBrandFactor(brandFactor);
      agentManager.tick();
    });

    it('increses year by one',function(){
      var currentYear = agentManager._year;
      agentManager.tick();
      var newYear = agentManager._year;
      expect(newYear).toEqual(currentYear + 1);
    });
    it('iterates #tick method over agents array',function(){
      expect(agent.tick).toHaveBeenCalled();
    });
    it('records current state', function(){
      expect(agentManager._currentRun).toEqual({ 1: { Breed_C: 1 }});
    });
  });
});
