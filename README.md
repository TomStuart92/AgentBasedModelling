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
- Run `npm install` to install dependencies.   
- Run `npm start` to start local server.     
- Go to `localhost:4000` in your browser to find the simulation.       
- Run `npm test` to run the test suite.  

## Usage Instructions

The model takes a single parameter, the Brand Factor which can be inputted at the top of the page.   

![alt text](https://dl.dropboxusercontent.com/u/19916786/model_input.png)

Once this is inputted the model can either be iterated through on a year by year basis:

![alt text](https://dl.dropboxusercontent.com/u/19916786/model_single.png)

Or run for the full 15 year length:

![alt text](https://dl.dropboxusercontent.com/u/19916786/model_run.png)

Once the model has been run, it can be reset by simply pressing the reset button:

![alt text](https://dl.dropboxusercontent.com/u/19916786/model_reset.png)

## Approach To Solution

To allow for an easy transition from simulation to visualisation, I have used pure Javascript to build the simulation, jQuery and GoogleCharts for the visualisation and Node to provide a local server host. Javascript is quick enough to handle bulk calculation as needed.

The simulation is built on top of the factory and iterator design patterns. The raw csv data is read into the AgentFactory class, and used to create an instance of an agent for each data point. The [jquery-csv library](http://code.google.com/p/jquery-csv/) is used to parse the csv file once loaded. The load operation takes O(n) time once the data has been received.

Each of these is aggregated in the AgentManager class, which is responsible for tracking the general state of the population and incrementing each age on a year by year basis. The actual year to year renewals are delegated to each Agent instance to respect encapsulation.

As we delegate this check to the instance of the class and similarly aggregate to get the status of the population, we can update our population in O(n) time.

Given the relative ease of the calculations all calculations take place in the clients browser. I've used jQuery and GoogleCharts to create a simple visualisation.

The application remains extendible, with the core logic encapsulated within private methods in the agent class, allowing the entire model to be changed with only limited refactoring for the agent class. The data remains exposed and can be changed easily at any time, again with only limited changes needed to be made.

## Further Improvements

To further build on this simulation, I would like to improve the visualisations, as I believe there remains some interesting insights that could be found by drilling down into the data further.
