'use strict';

function Agent (details) {
  this._agentBreed = details.agentBreed,
  this._policyID = details.policyID,
  this._age = details.age,
  this._socialGrade = details.socialGrade,
  this._payAtPurchase = details.payAtPurchase,
  this._attributeBrand = details.attributeBrand,
  this._attributePrice = details.attributePrice,
  this._attributePromotions = details.attributePromotions,
  this._autoRenew = details.autoRenew,
  this._switchInertia = details.switchInertia
}

Agent.prototype =  {
  currentBreed: function(){
    return this._agentBreed;
  },
  tick: function(brandFactor) {
    this._age++;
    if (this._autoRenew == 1) {
      this._MaintainBreed();
    } else {
      this._CheckBreed(brandFactor);
    };
  },
  _MaintainBreed: function() {
    return;
  },
  _CheckBreed: function(brandFactor) {
    if (this._agentBreed == 'Breed_C'){
      this._CheckBreedC();
    } else {
      this._CheckBreedNC(brandFactor);
    }
  },
  _CheckBreedC: function(){
    var check = this._socialGrade * this._attributeBrand;
    if (this._affinity() < check) {this._agentBreed = 'Breed_NC'};
  },
  _CheckBreedNC: function(brandFactor){
    var check = this._socialGrade * this._attributeBrand * brandFactor;
    if (this._affinity() < check) {this._agentBreed = 'Breed_C'};
  },
  _affinity: function() {
    return this._payAtPurchase / this._attributePrice + (2 * this._attributePromotions * this._switchInertia);
  }
};

module.exports = Agent;
