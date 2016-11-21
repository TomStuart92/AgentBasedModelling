'use strict';

describe("AgentManager", function() {
  var agentManager;
  var agent;
  var breedFactor = 1.5;

  beforeEach(function() {
    agentManager = new AgentManager();
    agent = { tick: function(value) {}, statusUpdate: function(){ return 'Breed_C'}};
    spyOn(agent, 'tick');
  })

  it('adds agents to memory',function(){
    agentManager.addAgent(agent);
    expect(agentManager._agents).toContain(agent);
  })

  it('sets breedFactor',function(){
    agentManager.setBreedFactor(breedFactor);
    expect(agentManager._breedFactor).toEqual(breedFactor);
  })

  describe('#tick',function(){
    beforeEach(function() {
      agentManager.addAgent(agent);
      agentManager.setBreedFactor(breedFactor);
      agentManager.tick()
    });

    it('increses year by one',function(){
      var currentYear = agentManager._year;
      agentManager.tick();
      var newYear = agentManager._year;
      expect(newYear).toEqual(currentYear + 1);
    })
    it('iterates #tick method over agents array',function(){
      expect(agent.tick).toHaveBeenCalled();
    }),
    it('records current state', function(){
      expect(agentManager._currentRun).toEqual({ 1: { Breed_C: 1 }})
    })
  })


});
