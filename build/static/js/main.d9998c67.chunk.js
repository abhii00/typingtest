(this.webpackJsonptypingtest=this.webpackJsonptypingtest||[]).push([[0],{14:function(t,e,r){},9:function(t,e,r){"use strict";r.r(e);var s=r(2),n=r(3),a=r(4),i=r(6),o=r(5),c=r(1),d=r.n(c),l=r(8),u=r.n(l),h=(r(14),r(0)),j=function(t){Object(i.a)(r,t);var e=Object(o.a)(r);function r(){return Object(n.a)(this,r),e.apply(this,arguments)}return Object(a.a)(r,[{key:"render",value:function(){return Object(h.jsx)("div",{className:"title",children:"A Simple Typing Test"})}}]),r}(d.a.Component);function m(t){return Object(h.jsxs)("nobr",{className:t.className,children:[t.word,"\xa0"]})}var b=function(t){Object(i.a)(r,t);var e=Object(o.a)(r);function r(){return Object(n.a)(this,r),e.apply(this,arguments)}return Object(a.a)(r,[{key:"renderWord",value:function(t,e,r){var s;switch(e){case!0:s="word-correct";break;case!1:s="word-incorrect";break;default:s="word"}return Object(h.jsx)(m,{word:t,className:s},r)}},{key:"render",value:function(){var t=this;return Object(h.jsx)("div",{className:"display",children:this.props.wordList.map((function(e,r){return t.renderWord(e,t.props.wordStates[r],r)}))})}}]),r}(d.a.Component);function v(t){return Object(h.jsx)("div",{className:t.className,children:t.value})}var p=function(t){Object(i.a)(r,t);var e=Object(o.a)(r);function r(){return Object(n.a)(this,r),e.apply(this,arguments)}return Object(a.a)(r,[{key:"render",value:function(){return Object(h.jsx)("input",{type:"text",className:"entry",onChange:this.props.handleChange})}}]),r}(d.a.Component),w=function(t){Object(i.a)(r,t);var e=Object(o.a)(r);function r(){return Object(n.a)(this,r),e.apply(this,arguments)}return Object(a.a)(r,[{key:"render",value:function(){return Object(h.jsxs)("div",{className:"wpm\r ",children:[this.props.WPM," words/minute"]})}}]),r}(d.a.Component),O=function(t){Object(i.a)(r,t);var e=Object(o.a)(r);function r(t){var a;return Object(n.a)(this,r),(a=e.call(this,t)).consts={wordsTotal:200,testTime:10,intervalTime:.01},a.state={dictionarySource:"./dictionaries/dict_test.txt",dictionary:Array(0).fill(null),wordList:Array(a.consts.wordsTotal).fill(null),wordStates:Array(a.consts.wordsTotal).fill(null),wordTimes:Array(a.consts.wordsTotal).fill(null),wordWPMs:Array(a.consts.wordsTotal).fill(null),timeRemaining:a.consts.testTime,startTime:0,testing:"pre",wordsCorrect:0,wordsIncorrect:0,currentEntry:"",currentWord:0},a.startTest=a.startTest.bind(Object(s.a)(a)),a.endTest=a.endTest.bind(Object(s.a)(a)),a.entryUpdate=a.entryUpdate.bind(Object(s.a)(a)),a.checkTimer=a.checkTimer.bind(Object(s.a)(a)),a}return Object(a.a)(r,[{key:"startTest",value:function(){var t=this;fetch(this.state.dictionarySource).then((function(t){return t.text()})).then((function(e){t.setState({dictionary:e.split("\r\n")}),console.log("Dictionary Loaded");for(var r=t.state.dictionary,s=r.length-1;s>0;s--){var n=Math.floor(Math.random()*(s+1)),a=[r[n],r[s]];r[s]=a[0],r[n]=a[1]}r.slice(0,t.consts.wordsTotal),t.setState({wordList:r}),console.log("Word List Loaded")})),this.setState({testing:"test",startTime:Date.now()}),this.interval=setInterval(this.checkTimer,1e3*this.consts.intervalTime),console.log("Test Started")}},{key:"endTest",value:function(){this.setState({testing:"post",startTime:Date.now(),WPM:60*this.state.wordsCorrect/this.consts.testTime}),clearInterval(this.interval)}},{key:"checkTimer",value:function(){this.setState({timeRemaining:(this.state.startTime+1e3*this.consts.testTime-Date.now())/1e3}),this.state.timeRemaining<=0&&this.endTest()}},{key:"entryUpdate",value:function(t){var e=t.target.value.split("");if(" "===e[e.length-1]){var r=this.state.currentWord+1,s=this.state.wordStates,n=this.state.wordsCorrect,a=this.state.wordsIncorrect,i=this.state.wordTimes;e.join("")===this.state.wordList[this.state.currentWord]+" "?(s[this.state.currentWord]=!0,i[this.state.wordTimes]=this.consts.testTime-this.state.timeRemaining,n+=1,console.log("Correct Word")):(s[this.state.currentWord]=!1,a+=1,console.log("Incorrect Word")),this.setState({currentWord:r,wordStates:s,wordTimes:i,wordsCorrect:n,wordsIncorrect:a}),t.target.value=""}}},{key:"renderWordCounters",value:function(){return Object(h.jsxs)("div",{className:"container-counter",children:[Object(h.jsx)(v,{value:this.state.wordsCorrect,className:"counter-correct"}),Object(h.jsx)(v,{value:this.state.wordsIncorrect,className:"counter-incorrect"})]})}},{key:"renderTimer",value:function(){return Object(h.jsx)(v,{value:Math.round(10*this.state.timeRemaining)/10,className:"timer"})}},{key:"renderWordDisplay",value:function(){return Object(h.jsx)(b,{wordList:this.state.wordList,wordStates:this.state.wordStates})}},{key:"renderWPM",value:function(){return Object(h.jsx)(w,{WPM:this.state.WPM,className:"wpm"})}},{key:"render",value:function(){switch(this.state.testing){case"pre":return Object(h.jsxs)("div",{children:[Object(h.jsx)(j,{}),this.renderWordCounters(),this.renderTimer(),this.renderWordDisplay(),Object(h.jsx)(p,{handleChange:this.startTest})]});case"test":return Object(h.jsxs)("div",{children:[Object(h.jsx)(j,{}),this.renderWordCounters(),this.renderTimer(),this.renderWordDisplay(),Object(h.jsx)(p,{handleChange:this.entryUpdate})]});case"post":return Object(h.jsxs)("div",{children:[Object(h.jsx)(j,{}),this.renderWordCounters(),this.renderWPM()]})}}}]),r}(d.a.Component);u.a.render(Object(h.jsx)(O,{}),document.getElementById("root"))}},[[9,1,2]]]);
//# sourceMappingURL=main.d9998c67.chunk.js.map