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
    constructor(props){
        super(props);
        this.state = {
            dictionarySource: this.props.dictionarySource,
            dictionary: Array(0).fill(null),
            wordList: Array(0).fill(null),
            wordStates: Array(0).fill(null),
        };
    }

    componentDidMount(){
        fetch(this.state.dictionarySource)
        .then((r) => r.text())
        .then(text  => {
            this.setState({dictionary: text.split("\r\n")});

            var tempwordList = this.state.dictionary;
            for (let i = tempwordList.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [tempwordList[i], tempwordList[j]] = [tempwordList[j], tempwordList[i]];
            }
            tempwordList.slice(0,this.props.wordsTotal);
            this.setState({wordList: tempwordList});
        })  
    }

    renderWord(word, correct, wordID){
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
                {this.state.wordList.map((word, index) => (
                    this.renderWord(word, this.state.wordStates[index], index)
                ))}
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
            <input type="text" className="entry" onChange={this.props.handleChange}></input>
        );
    }
}

class TypingTest extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dictionarySource: "./dictionaries/dict_test.txt",
            wordsCorrect: 5,
            wordsTotal: 200,

            timeRemaining: 30,
            startTime: 0,
            currentTime: 0,
            endTime: 0,

            testing: "pre",
            currentEntry: ""
        };

        this.consts = {
            wordsTotal: 200,

            testTime: 60,
            intervalTime: 1
        }

        this.startTest = this.startTest.bind(this);
        this.entryUpdate = this.entryUpdate.bind(this);
    }

    startTest(){
        this.setState({
            testing: "test",
            startTime: Date.now(),
            endTime: this.state.startTime + this.state.testTime
        });
        console.log("Test Started");
    }

    entryUpdate(e){
        this.setState({currentEntry: e.target.value});
    }

    renderCounter(){
        return <Counter value={this.state.wordsCorrect} className="counter"/>;
    }

    renderTimer(){
        return <Counter value={this.state.timeRemaining} className="timer"/>;
    }

    renderWordDisplay(){
        return <WordDisplay dictionarySource={this.state.dictionarySource} wordsTotal={this.consts.wordsTotal}/>;
    }

    render() {
        switch (this.state.testing){
            case "pre":
                return (
                    <div>
                        <Title/>
                        {this.renderCounter()}
                        {this.renderTimer()}
                        {this.renderWordDisplay()}
                        <Entry handleChange={this.startTest}/>
                    </div>
                );
            case "test":
                return (
                    <div>
                        <Title/>
                        {this.renderCounter()}
                        {this.renderTimer()}
                        {this.renderWordDisplay()}
                        <Entry handleChange={this.entryUpdate}/>
                        <button onClick = {() => this.setState({testing: "pre"})}> Stop </button>
                    </div>
                );
            case "post":
                break;
            default:
                break;
        }
    }
}

ReactDOM.render(
    <TypingTest />,
    document.getElementById('root')
);