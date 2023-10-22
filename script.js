const question = document.getElementById('question');
const nextBtn = document.getElementById('next-btn');
const optionBtns = document.querySelectorAll(".option-btn");
const submitBtn = document.getElementById('submit-btn');
const playAgainBtn = document.getElementById('playagain-btn');
const startBtn = document.getElementById('start-btn');


const displayScore = document.querySelector('.score');

let idx = 0;

let score = 0;

let submit = false;

async function getQuestions()
{
    const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple');
    const rawData = await response.json();

    const data = rawData.results;
  
    console.log(data);

    
    const continueQuiz = function(index){

        if(index==9)
        {
            // nextBtn.display.style=none;
            // submitBtn.display.style=block;
            submit=true;
        }
        else
        {

            submit=false;
        }

        const q = data[index];
    
    
        console.log(q);
        // ######## Question
        const apiResponse  = `Q${index+1}. ${q.question}`;
        // question.textContent = `Q${index+1}. ${q.question}`;

        // Create a DOMParser
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(apiResponse , 'text/html').body.textContent;
        question.textContent = decodedString;



        // ########## Options
        const randomInteger = Math.floor(Math.random() * 4) + 1;
        
        const correctAns = parser.parseFromString(q.correct_answer , 'text/html').body.textContent;
        console.log(correctAns);
        let j=0;
        for(let i=1;i<=4;i++)
        {
            const option = document.querySelector(`.ans${i}`);

            if(i===randomInteger)
            option.textContent = parser.parseFromString(q.correct_answer , 'text/html').body.textContent;
            else
            {
                option.textContent = parser.parseFromString(q.incorrect_answers[j++] , 'text/html').body.textContent;;
            }
        }

        
        

        optionBtns.forEach((optionBtn) => {

            optionBtn.classList.remove("incorrect");
            optionBtn.classList.remove("correct");

            // optionBtn.disabled=false;

            optionBtn.addEventListener('click', handleClick);
        });

    
        console.log(score);


        function handleClick(){

            const optionBtn = this;
            if(submit)
            {
                nextBtn.style.display = "none";
                submitBtn.style.display = "block";
            }
            else
            {
                submitBtn.style.display = "none";
                nextBtn.style.display = "block";
            }
                
                    
            // Your click event handling code here
            if(optionBtn.textContent === correctAns){
                score++;
                console.log("True matched");
                // optionBtn.classList.remove("correct");
                optionBtn.classList.remove("incorrect");
                optionBtn.classList.add("correct");
            }
            else{
                console.log("false mismatched");
                console.log(optionBtn.textContent);
                // optionBtn.classList.remove("incorrect");
                optionBtn.classList.remove("correct");
                optionBtn.classList.add("incorrect");
            }
    
            // Disable further clicks to prevent changing the styling
            optionBtns.forEach((btn) => {
                btn.disabled = true;

                // Remove previous event listeners from option buttons
                btn.removeEventListener('click', handleClick);
            });

            
        
        }
    }

    
    continueQuiz(0);

    nextBtn.addEventListener('click', ()=>{
        optionBtns.forEach((btn) => {
            btn.disabled = false;
        });
        idx++;
        continueQuiz(idx);
    })

    submitBtn.addEventListener('click', () =>{

        displayScore.textContent += `${score} out of 10.`;
        document.querySelector('.end-card').style.display = "block";
        document.querySelector('.card').style.display="none";
    })

    playAgainBtn.addEventListener('click', () => {

        window.location.reload();
    })

    startBtn.addEventListener('click', () => {

        document.querySelector('.start-card').style.display="none";
        document.querySelector('.card').style.display="block";

    })


    

}

getQuestions();


