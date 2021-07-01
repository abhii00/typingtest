import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'

class Title extends React.Component{
    render() {
        return (
            <div className="title">
                A Simple Typing Test
            </div>
        );
    }
}

function Word(props){
    return(
        <nobr className={props.className}>
            {props.word}
            &nbsp;
        </nobr>
    );
}

class WordDisplay extends React.Component{
    renderWord(word, correct){
        var wordType;
        switch (correct){
            case true:
                wordType = "word-correct";
                break;
            case false:
                wordType = "word-incorrect";
                break;
            default:
                wordType = "word";
                break;
        }
        return <Word word={word} className={wordType}/>;
    }

    render() {
        return (
            <div className="display">
                {this.renderWord("apples", true)}
                {this.renderWord("banana", false)}
                {this.renderWord("cranberries")}
            </div>
        );
    }
}

function Counter(props){
    return(
        <div className={props.className}> 
            {props.value}
        </div>
    );
}


class Entry extends React.Component{
    render(){
        return(
            <input type="text" className="entry"></input>
        );
    }
}

class TypingTest extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            wordsCorrect: 5,
            timeRemaining: 30,
        };
    }

    renderCounter(){
        return <Counter value={this.state.wordsCorrect} className="counter"/>;
    }

    renderTimer(){
        return <Counter value={this.state.timeRemaining} className="timer"/>;
    }

    render() {
        return(
            <div>
                <Title/>
                {this.renderCounter()}
                {this.renderTimer()}
                <WordDisplay/>
                <Entry/>
            </div>
        );
    }
}

ReactDOM.render(
    <TypingTest />,
    document.getElementById('root')
);