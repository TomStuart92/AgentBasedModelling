'use strict';

function Agent (details) {
  this._agentBreed = details.Agent_Breed,
  this._policyID = details.Policy_ID,
  this._age = parseFloat(details.Age),
  this._socialGrade = parseFloat(details.Social_Grade),
  this._payAtPurchase = parseFloat(details.Payment_at_Purchase),
  this._attributeBrand = parseFloat(details.Attribute_Brand),
  this._attributePrice = parseFloat(details.Attribute_Price),
  this._attributePromotions = parseFloat(details.Attribute_Promotions),
  this._autoRenew = parseFloat(details.Auto_Renew),
  this._switchInertia = parseFloat(details.Inertia_for_Switch),
  this._status = "Remains: " + details.Agent_Breed;
}

Agent.prototype =  {
  statusUpdate: function(){
    return this._status;
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
    this._statusRemains();
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
    if (this._affinity() < check) {
      this._agentBreed = 'Breed_NC'
      this._statusChanges();
    }
    else {
      this._statusRemains();
    };
  },
  _CheckBreedNC: function(brandFactor){
    var check = this._socialGrade * this._attributeBrand * brandFactor;
    if (this._affinity() < check) {
      this._agentBreed = 'Breed_C'
      this._statusChanges();
    } else {
      this._statusRemains();
    };
  },
  _statusRemains: function(){
    this._status = "Remains: " + this._agentBreed;
  },
  _statusChanges: function(){
    if (this._status == "Becomes: Breed_NC")
      this._status = "Regained: " + this._agentBreed
    else {
      this._status = "Becomes: " + this._agentBreed;
    }
  },
  _affinity: function() {
    return this._payAtPurchase / this._attributePrice + (2 * this._attributePromotions * this._switchInertia);
  }
};
