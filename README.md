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

## Further Improvements
