# overbond-coding-exercise

### Running the program

To run the program, include the input as a file named data.csv in the /app directory. The program will run the nearest yield (part 1) by default. To instead run the linear interpolation, add ",linear" to the headers of the csv file.

###### e.g.
```
bond,type,term,yield,linear
C1,corporate,1.3 years,3.30%
C2,corporate,2.0 years,3.80%
...
```

Then run the index.js file and the program will return the answer in the console.

### Design choices

I decided to use Javascript/Node.js because I am familiar with it and I know there is not much overhead from the designer's perspective. I used the mocha test framework because it is a simply solution that is easy to set up.

A possible improvement would be to parse the inputs into a better defined structure. Rather than using accesses like ```government_bonds[i][3]```, we could use ```government_bonds[i].yield```.

