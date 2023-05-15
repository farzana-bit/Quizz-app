export default function Question (question, choices, answer) {
     this.question = question;
     this.choices = choices;
     this.answers = answer;

}

Question.prototype.isCorrect = function(choice){
        return this.answers === choice;
}