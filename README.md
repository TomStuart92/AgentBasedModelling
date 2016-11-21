Attached you will find an Excel file with data fields, some equations, and program/model flow. The goal here is show how you handle the data, setup the codebase, the values you get, how you output the data, and finally documentation. We look forward to receiving the completed test by Monday morning. You must provide your code to a public repo so that John may then access and view. Again you may use whatever resource, programming framework or language you like; however John should be able to download your code and be able to test it ~30 mins so please refrain from complicated/niche dev environments.

The test itself can be brute-force answered in 15-45 minutes, but what we are really looking for is an understanding of creating a simulation code environment, being able to work with data and equations and translate that into code and input, how complex or reusable your output or possibly visualization is, how well documented your code or instructions are, and finally how robust and extendable your code is. The test truly allows for a lot of creativity, and there’s no way to do every part perfectly, but it lets us see your strengths and weaknesses, and above all how you approach and resolve the problem.

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
