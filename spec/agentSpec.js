var Agent = require('../lib/agent')
'use strict';

describe("Agent", function() {
  var agent;
  var agentDetails = {agentBreed: 'Breed_C',
                      policyID: '132802001.0',
                      age: 66,
                      socialGrade: 3,
                      payAtPurchase: 250,
                      attributeBrand: 25.3,
                      attributePrice: 16.6,
                      attributePromotions: 5.1,
                      autoRenew: 0,
                      switchInertia: 4};
  var originalBreed = 'Breed_C';
  var switchedBreed = 'Breed_NC';
  var brandFactor = 1.5;

  beforeEach(function() {
    agent = new Agent(agentDetails);
  })

  describe("agent has attributes", function() {
    it("attributes are set on initialization", function() {
      var attributes = {agentBreed: agent.currentBreed(),
                          policyID: agent._policyID,
                          age: agent._age,
                          socialGrade: agent._socialGrade,
                          payAtPurchase: agent._payAtPurchase,
                          attributeBrand: agent._attributeBrand,
                          attributePrice: agent._attributePrice,
                          attributePromotions: agent._attributePromotions,
                          autoRenew: agent._autoRenew,
                          switchInertia: agent._switchInertia}
      expect(attributes).toEqual(agentDetails);
    })
  });

  describe("#tick:", function() {
    it("increments age by one year", function() {
      agent.tick(brandFactor);
      expect(agent._age).toEqual(agentDetails.age + 1);
    })
    describe("checking agentBreed:",function(){
      it("has the same agentBreed if autoRenew is true", function() {
        agent._autoRenew = 1;
        agent.tick(brandFactor);
        expect(agent.currentBreed()).toEqual(agentDetails.agentBreed);
      })
      it("calculates Affinity if autoRenew is false", function() {
        var PayAtPur = agentDetails.payAtPurchase;
        var AttrPrice = agentDetails.attributePrice;
        var AttrProm = agentDetails.attributePromotions;
        var Inertia = agentDetails.switchInertia;
        var affinity = PayAtPur / AttrPrice + (2 * AttrProm * Inertia);

        expect(agent._affinity()).toEqual(affinity)
      })

      describe("checking breed C to NC transition:", function(){
        it("keeps breed C if high affinity", function() {
          spyOn(agent, "_affinity").and.returnValue(1000);
          agent.tick(brandFactor);
          expect(agent.currentBreed()).toEqual(originalBreed);
        })
        it("switches to breed NC if low affinity", function() {
          spyOn(agent, "_affinity").and.returnValue(0);
          agent.tick(brandFactor);
          expect(agent.currentBreed()).toEqual(switchedBreed);
        })
      });

      describe("checking breed NC to C transition:", function(){
        it("keeps breed NC if high affinity", function() {
          agent._agentBreed = switchedBreed;
          spyOn(agent, "_affinity").and.returnValue(1000);
          agent.tick(brandFactor);

          expect(agent.currentBreed()).toEqual(switchedBreed);
        })

        it("switches to breed C if low affinity", function() {
          agent._agentBreedg = switchedBreed;
          spyOn(agent, "_affinity").and.returnValue(0);
          agent.tick(brandFactor);
          expect(agent.currentBreed()).toEqual(originalBreed);
        })
      });
    });
  });
});
