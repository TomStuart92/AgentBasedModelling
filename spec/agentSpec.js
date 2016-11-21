'use strict';

describe("Agent", function() {
  var agent;
  var agentDetails = {Agent_Breed: 'Breed_C',
                      Policy_ID: '132802001.0',
                      Age: 66,
                      Social_Grade: 3,
                      Payment_at_Purchase: 250,
                      Attribute_Brand: 25.3,
                      Attribute_Price: 16.6,
                      Attribute_Promotions: 5.1,
                      Auto_Renew: 0,
                      Inertia_for_Switch: 4};
  var originalBreed = 'Breed_C';
  var switchedBreed = 'Breed_NC';
  var brandFactor = 1.5;

  beforeEach(function() {
    agent = new Agent(agentDetails);
  })

  describe("agent has attributes", function() {
    it("attributes are set on initialization", function() {
      var attributes = {Agent_Breed: agent._agentBreed,
                          Policy_ID: agent._policyID,
                          Age: agent._age,
                          Social_Grade: agent._socialGrade,
                          Payment_at_Purchase: agent._payAtPurchase,
                          Attribute_Brand: agent._attributeBrand,
                          Attribute_Price: agent._attributePrice,
                          Attribute_Promotions: agent._attributePromotions,
                          Auto_Renew: agent._autoRenew,
                          Inertia_for_Switch: agent._switchInertia}
      expect(attributes).toEqual(agentDetails);
    })
  });

  describe("#tick:", function() {
    it("increments age by one year", function() {
      agent.tick(brandFactor);
      expect(agent._age).toEqual(agentDetails.Age + 1);
    })
    describe("checking agentBreed:",function(){
      it("has the same agentBreed if autoRenew is true", function() {
        agent._autoRenew = 1;
        agent.tick(brandFactor);
        expect(agent.statusUpdate()).toEqual('Remains: Breed_C');
      })
      it("calculates Affinity if autoRenew is false", function() {
        var PayAtPur = agentDetails.Payment_at_Purchase;
        var AttrPrice = agentDetails.Attribute_Price;
        var AttrProm = agentDetails.Attribute_Promotions;
        var Inertia = agentDetails.Inertia_for_Switch;
        var affinity = PayAtPur / AttrPrice + (2 * AttrProm * Inertia);

        expect(agent._affinity()).toEqual(affinity)
      })

      describe("checking breed C to NC transition:", function(){
        it("keeps breed C if high affinity", function() {
          spyOn(agent, "_affinity").and.returnValue(1000);
          agent.tick(brandFactor);
          expect(agent.statusUpdate()).toEqual('Remains: Breed_C');
        })
        it("switches to breed NC if low affinity", function() {
          spyOn(agent, "_affinity").and.returnValue(0);
          agent.tick(brandFactor);
          expect(agent.statusUpdate()).toEqual('Becomes: Breed_NC');
        })
      });

      describe("checking breed NC to C transition:", function(){
        it("keeps breed NC if high affinity", function() {
          agent._agentBreed = switchedBreed;
          spyOn(agent, "_affinity").and.returnValue(1000);
          agent.tick(brandFactor);
          expect(agent.statusUpdate()).toEqual('Remains: Breed_NC');
        })

        it("switches to breed C if low affinity", function() {
          agent._agentBreed = switchedBreed;
          spyOn(agent, "_affinity").and.returnValue(0);
          agent.tick(brandFactor);
          expect(agent.statusUpdate()).toEqual('Becomes: Breed_C');
        })
      });
    });
  });
});
