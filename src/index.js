import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'

class Title extends React.Component
//component for the title
{
    render() {
        return (
            <div className="title">
                A Simple Typing Test
            </div>
        );
    }
}

function Word(props)
//component for individual words
{
    return(
        <nobr className={props.className}>
            {props.word}
            &nbsp;
        </nobr>
    );
}

class WordDisplay extends React.Component
//component to display words for test
{
    renderWord(word, correct, wordID)
    {
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
        return <Word word={word} className={wordType} key={wordID}/>;
    }

    render() {
        return (
            <div className="display">
                {this.props.wordList.map((word, index) => (
                    this.renderWord(word, this.props.wordStates[index], index)
                ))}
            </div>
        );
    }
}

function Counter(props)
//component for simple number display
{
    return(
        <div className={props.className}> 
            {props.value}
        </div>
    );
}

class Entry extends React.Component
//component for word entry
{
    render(){
        return(
            <input type="text" className="entry" onChange={this.props.handleChange}></input>
        );
    }
}

class WPM extends React.Component
//component for wpm
{
    render(){
        return(
            <div className="wpm
            ">
                {this.props.WPM} words/minute
            </div>
        );
    }
}

class TypingTest extends React.Component
//component for overall typing test
{
    constructor(props){
        super(props);
        this.consts = {
            wordsTotal: 200,

            testTime: 10,
            intervalTime: 0.01
        }

        this.state = {
            dictionarySource: "./dictionaries/dict_test.txt",
            dictionary: Array(0).fill(null),
            wordList: Array(this.consts.wordsTotal).fill(null),
            wordStates: Array(this.consts.wordsTotal).fill(null),
            wordTimes: Array(this.consts.wordsTotal).fill(null),
            wordWPMs: Array(this.consts.wordsTotal).fill(null),

            timeRemaining: this.consts.testTime,
            startTime: 0,

            testing: "pre",
            wordsCorrect: 0,
            wordsIncorrect: 0,
            currentEntry: "",
            currentWord: 0,
        };

        this.startTest = this.startTest.bind(this);
        this.endTest = this.endTest.bind(this);
        this.entryUpdate = this.entryUpdate.bind(this);
        this.checkTimer = this.checkTimer.bind(this);
    }

    startTest(){ 
        fetch(this.state.dictionarySource)
        .then((r) => r.text())
        .then(text  => {
            this.setState({dictionary: text.split("\r\n")});
            console.log("Dictionary Loaded"); 

            var tempwordList = this.state.dictionary;
            for (let i = tempwordList.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [tempwordList[i], tempwordList[j]] = [tempwordList[j], tempwordList[i]];
            }
            tempwordList.slice(0,this.consts.wordsTotal);
            this.setState({wordList: tempwordList});
            console.log("Word List Loaded"); 
        }) 
        
        this.setState({
            testing: "test",
            startTime: Date.now(),
        });
        this.interval = setInterval(this.checkTimer, this.consts.intervalTime*1000);

        console.log("Test Started");
    }

    endTest(){
        this.setState({
            testing: "post",
            startTime: Date.now(),
            WPM: this.state.wordsCorrect*60/this.consts.testTime,
        });
        clearInterval(this.interval);
    }

    checkTimer(){
        this.setState({
            timeRemaining: (this.state.startTime + this.consts.testTime*1000 - Date.now())/1000
        })

        if (this.state.timeRemaining <= 0){
            this.endTest();
        }
    }

    entryUpdate(e){
        var entryString = e.target.value;
        var currentEntry = entryString.split("")

        if (currentEntry[currentEntry.length - 1] === " "){
            var tcW = this.state.currentWord + 1;
            var twS = this.state.wordStates;
            var twC = this.state.wordsCorrect;
            var twI = this.state.wordsIncorrect;
            var twT = this.state.wordTimes;
            
            if (currentEntry.join("") === this.state.wordList[this.state.currentWord] + " "){
                twS[this.state.currentWord] = true;
                twT[this.state.wordTimes] = this.consts.testTime - this.state.timeRemaining;
                twC += 1;
                console.log("Correct Word");
            }
            else{
                twS[this.state.currentWord] = false;
                twI += 1;
                console.log("Incorrect Word");
            }

            this.setState({
                currentWord: tcW,
                wordStates: twS,
                wordTimes: twT,
                wordsCorrect: twC,
                wordsIncorrect: twI,
            })

            e.target.value = ""
        }
    }

    renderWordCounters(){
        return (
        <div className = "container-counter">
            <Counter value={this.state.wordsCorrect} className="counter-correct"/>
            <Counter value={this.state.wordsIncorrect} className="counter-incorrect"/>
        </div>
        );
    }

    renderTimer(){
        return <Counter value={Math.round(this.state.timeRemaining*10)/10} className="timer"/>;
    }

    renderWordDisplay(){
        return <WordDisplay wordList={this.state.wordList} wordStates={this.state.wordStates}/>;
    }

    renderWPM(){
        return <WPM WPM={this.state.WPM} className="wpm"/>;
    }

    render() {
        switch (this.state.testing){
            case "pre":
                return (
                    <div>
                        <Title/>
                        {this.renderWordCounters()}
                        {this.renderTimer()}
                        {this.renderWordDisplay()}
                        <Entry handleChange={this.startTest}/>
                    </div>
                );
            case "test":
                return (
                    <div>
                        <Title/>
                        {this.renderWordCounters()}
                        {this.renderTimer()}
                        {this.renderWordDisplay()}
                        <Entry handleChange={this.entryUpdate}/>
                    </div>
                );
            case "post":
                return(
                    <div>
                        <Title/>
                        {this.renderWordCounters()}
                        {this.renderWPM()}
                    </div>
                );
            default:
                break;
        }
    }
}

//render typing test
ReactDOM.render(
    <TypingTest />,
    document.getElementById('root')
);