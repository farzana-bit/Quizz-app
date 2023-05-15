import Question from "./Question.js";
import Quiz from "./Quiz.js";
//IIFE = Immediately Invocked Function Expression

// function App(){
//     console.log('Hello');
// }
// App();

 const App = (() => {
        //Cache the dom
     
        const quizEl = document.querySelector('.quiz');
        const quizQues = document.querySelector('.quiz__question')
        const quizTracker = document.querySelector('.quiz__tracker')
        const innerProgress = document.querySelector('.progress__inner')
        const tagLine = document.querySelector('.quiz__tagline')
        const choices = document.querySelector('.quiz__choices')
        const nextButton = document.querySelector('.next')
        const restartButton = document.querySelector('.restart')
        const timer = document.querySelector('.countDown')

        const q1 = new Question (
            'How many time zones are there in Russia?',
            [ 
                '12', 
                '13', 
                '17', 
                '11'
            
            ], 
            3
        );

         const q2 = new Question (
            'What is one of the big differences between traditional media and social media?',
            [ 
                'participatory production', 
                'social media reaches only a few people at a time',
                 'structure of the companies', 
                 'traditional media offers no way for audiences to communicate with media producers '
            ], 
            1
        );

          const q3 = new Question (
            'Which of the following is NOT a fundamental area of change regarding peoples media habits?',
            [ 
                'conversation', 
                'collaboration',
                 'choice', 
                 'communication'
            ], 
            3
        );

          const q4 = new Question (
            'How many stripes are there on the US flag?',
            [ 
                '11', 
                '13',
                 '45', 
                 '14 '
            ], 
            2
        );

         const q5 = new Question (
            'When did they open the London underground?',
            [ 
                '1865', 
                '1862',
                 '1863', 
                 '1866'
            ], 
            3
        );

         const q6 = new Question (
            'How many keys does a classic piano have?',
            [ 
                '87', 
                '82',
                 '88', 
                 '89'
            ], 
            3
        );


        

//         const config = require("./settings.json");

// var quotes = config.quotes;

// function randomQuote() {
//     return quotes[Math.floor(Math.random() * quotes.length)];
// };


// if(message.content.toLowerCase() === prefix + "quote") {

//     message.channel.send(randomQuote());

    
        // fetch("../quiz.json")
        // .then(function(resp){
        //     return resp.json();
        // })
        // .then(function(data){
        //    const quizData = data
        //    const ques = new Question(quizData)
           
        // })

       // const quizData = require("./quiz.json");

       // quizData.forEach((item) => console.log(item))


        const quiz = new Quiz ([q1, q2, q3, q4, q5, q6]);
      //const quiz = new Quiz(quizData);
        const listeners = () => {
            nextButton.addEventListener('click', function () {
                const selectRadioElem = document.querySelector('input[name="choice"]:checked');
                if(selectRadioElem){
                    const key = Number(selectRadioElem.getAttribute('data-order'));
                    quiz.increaseScore(key);
                    renderAll();
                }
            });

            restartButton.addEventListener('click', function () {
                //1. reset progress state
                quiz.reset();
               // render everything
               renderAll();
                nextButton.style.opacity = 1;
                choices.style.opacity = 1;

            })

        } ;


      //Count Down time

            // const renderTime = () => setInterval(() =>{
                //   let countDownTime = new Date().getTime();
                //    var seconds = Math.floor((countDownTime % (1000 * 31)) / 1000);

                //   timer.innerHTML = seconds + " seconds";
                //    if (countDownTime < 0) {
                //                 clearInterval(setInterval());
                //                 timer.innerHTML = "EXPIRED";
                //             }
                    //   
            const renderTime = () =>{
                        var count = 30;
                        var interval = setInterval(function(){
                        timer.innerHTML=count;
                        count--

                        if (count === 0){
                            clearInterval(interval);
                            //timer.innerHTML='Done';
                            
                            // or...
                            alert("You're out of time!");
                        }
                        
                       
                        }, 1000);

                        console.log(interval);
                        
                       }
                       
                 
                         
                           
           // }

            
      

        const setValue = (elem, value) => {
            elem.innerHTML = value;
        }

        const renderQuestion = () => {
            const currQues = quiz.getCurrentQuestion().question;
            //quizQues.innerHTML = currQues;
            setValue(quizQues, currQues)
            
        }

        const renderChoiceElements = () => {
            let markup = '';
            const currChoices = quiz.getCurrentQuestion().choices;
            currChoices.forEach((elem, index) => {
                markup += `
                       <li class="quiz__choice">
                                    <input
                                        type="radio"
                                        name="choice"
                                        class="quiz__input"
                                        data-order="${index}" 
                                        id="choice${index}"
                                    />
                                    <label for="choice${index}" class="quiz__label">
                                        <i></i>
                                        <span>${elem}</span>
                                    </label>
                                </li>
                `
            });
            //choices.innerHTML = markup
            setValue(choices, markup);
        };

        const renderTracker = () => {
            const index = quiz.currentIndex
            setValue(quizTracker,`${index + 1} 0f ${quiz.questions.length}`) ;
            
        }

        const renderWidth = (width, maxPercent) => {
            let loadingBar = setInterval(function () {
                if(width > maxPercent){
                    clearInterval(loadingBar);
                }else{
                    width++;
                    innerProgress.style.width = width + "%";

                }
            })

        }

         const getPercentage = (num1, num2) => {
             return Math.round((num1 / num2) * 100)

         }
       

        const renderProgress = () => {
            const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length) ;
            renderWidth(0, currentWidth);
            
        }

        
        
       const renderEndScreen = () => {
                setValue(quizQues, 'Congratulations!');
                setValue(tagLine, 'Quiz End');
                setValue(quizTracker, `Your Score: ${getPercentage(quiz.score, quiz.questions.length)} %`);
                nextButton.style.opacity = 0;
                choices.style.opacity = 0;
                renderProgress();

       }
        

         const renderAll = () => {
             if(quiz.hasEnded()) {
                //render End Screen
                renderEndScreen();
             }
             else{
                 //1. render the  question [done]
                 renderQuestion()
                 //2. render the choices [done]
                 renderChoiceElements()
                 //3. render the progress bar [done]
                  renderTracker()
                 //4. render progress [done]
                 renderProgress()
                 /**timer */
                //  renderTime()
                 
               
             }
         };

        
    return { 
        renderAll: renderAll,
        listeners: listeners
     };

 }) ();

 App.renderAll();
 App.listeners();