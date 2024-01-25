//STEP 1
//Iterate through all the questions, expand the answers and store the results
let arrayAnswers = [];
let arrayQuestionsAnswers = [];
let arrayQuestions = [];
let questions = document.querySelectorAll('[data-q]');
let i = 0;
for (const question of questions) {
    (function(i){  
        window.setTimeout(function(){          
            arrayQuestions.push(question.innerText);
            arrayAnswers.push(question.innerText);            
                let answer = question.querySelector('[role="button"]');
                answer.focus();
                answer.click();
                arrayQuestionsAnswers.push(question.innerText);                
                if (i >= 2) { 
                    j = 0;
                    let questions = document.querySelectorAll('[data-q]');
                    for (const question of questions) { 
                        (function(j){  
                            window.setTimeout(function(){
                                arrayQuestions.push(question.innerText);
                                let answer = question.querySelector('[role="button"]');
                                answer.focus();
                                answer.click();
                                arrayQuestionsAnswers.push(question.innerText);
                                if (j === questions.length - 1) console.log("**************** FINISHED ****************");
                            }, j * 5000);        
                        }(j));
                        j++;
                    }                 
                }
        }, i * 5000);   
    }(i));
    i++;
}       
// STEP 2: Download the results as a CSV file

let arrayResults = [];
for (const questionAnswer of arrayQuestionsAnswers) {
  let firstLine = questionAnswer.split('\n')[0].trim();
  let restOfTheString = questionAnswer.split('\n').slice(1).join('\n').split(/(\w+\.\w+)/)[0].replace(/;/g, '').replace(/https:\/\//g, '');
  if (!arrayResults.join('\n').includes(firstLine)) {
    arrayResults.push(firstLine + ';' + restOfTheString);
  }
}
console.log("Final results array:");
console.log(arrayResults);
let elem = document.createElement('a');
let arrayResultsWithQuotes = arrayResults.map(result => {
  let parts = result.split(';');
  return `"${parts[0]}";"${parts.slice(1).join('";"')}"`;
});
elem.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(arrayResultsWithQuotes.join('\n'));
elem.target = '_blank';
elem.download = 'questions_eth_final.csv';
elem.click();
