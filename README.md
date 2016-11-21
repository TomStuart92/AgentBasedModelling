# README

## Introduction

This project creates a simple agent based model of product affinity. Based on an Input Brand Factor, it iterates through a unique population to show movements between two cohorts. The rules that govern this iteration are below:

```
Brand_Factor		
INPUT - Range (0.1 -> 2.9)		

Run for 15 Years		
Every Year:	Increment Age
	If Auto Renew - Maintain Breed

Else No Auto-Renew:	Affinity = 	Payment_at_Purchase/Attribute_Price + (2 * Attribute_Promotions * Inertia_for_Switch)
	If Breed_C	Switch to Breed_NC if Affinity < (Social_Grade * Attribute_Brand)
	If Breed_NC	Switch to Breed_C if Affinity < (Social_Grade * Attribute_Brand * Brand_Factor)

Output:	Agents in each Breed
	Breed_C Lost (Switched to Breed_NC)
	Breed_C Gained (Switch from Breed_NC)
	Breed_C Regained (Switched to NC, then back to C)
```

## Installation instructions

To install this project to your local machine:
- Fork and Clone to your local machine.     
- Install [Node](https://nodejs.org/en/download/) and [NPM](http://blog.npmjs.org/post/85484771375/how-to-install-npm).    
- Run `npm start` to start local server. This is found at `localhost:4000` by default.    
- Run `npm test` to run the test suite.    

## Approach To Solution

To allow for an easy transition from simulation to visualisation, I have used pure Javascript to build the simulation, jQuery and GoogleCharts for the visualisation and Node to provide a local server host. Javascript is quick enough to handle bulk calculation as needed.

The simulation is built on top of the factory and iterator design patterns. The raw csv data is read into the AgentFactory class, and used to create an instance of an agent for each data point.

Each of these is aggregated in the AgentManager class, which is responsible for tracking the general state of the population and incrementing each age on a year by year basis. The actual year to year renewals are delegated to each Agent instance to respect encapsulation. As we delegate this check to the instance of the class, we can update our population in O(n) time.

On each

Given the relative ease of the calculations all calculations take place in the clients Browser,.


## Further Improvements
