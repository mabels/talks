
const LetterReducer = function(letterReducers) {
  return function() {
    for (let letter of Array.from(arguments).filter((i) => i.letter)) {
      let ridx = ~~(letter.idx/4);
      let lr = [];
      if (letterReducers.has(ridx)) {
        lr = letterReducers.get(ridx);
      } else {
        letterReducers.set(ridx, lr);
      }
      lr.push(letter);
    }
    return [...letterReducers.values()];
  }
}(new Map());

const ToString = function(letters) {
  return function() {
    for (let l of Array.from(arguments).filter((i) => i[0].letter)) {
      letters = letters.concat(l);
    }
    return letters.sort((a,b) => a.idx - b.idx).map(i => i.letter).join("")
  }
}(new Array())


function id2LetterMap(i) { 
  return { idx: i, letter: "Hello World"[i] }
}

function Initiator() {
  return [0,1,2,3,4,5,6,7,8,9,10,11].sort(() => .5 - Math.random());
}

a=Initiator().map(i => id2LetterMap(i)).reduce((e, v) => LetterReducer(e,v)).reduce((e, v) => ToString(e,v))
console.log(a)
