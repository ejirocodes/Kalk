const getHistory = () => {
  return document.querySelector("#history-value").innerText;
};

const printHistory = num => {
  document.getElementById("history-value").innerText = num;
};

const getOutput = () => {
  return document.querySelector("#output-value").innerText;
};

const printOutput = num => {
  if (num == "") {
    document.querySelector("#output-value").innerText = num;
  } else {
    document.getElementById("output-value").innerText = getFormattedNum(num);
  }
};

const getFormattedNum = num => {
  if (num == "") {
    return  ""
  }
  let n = Number(num);
  let value = n.toLocaleString("en");
  return value;
};

const reverseNumFormat = num => {
  return Number(num.replace(/,/g, ""));
};

const operator = document.getElementsByClassName("operator");
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function() {
    if (this.id === "clear") {
      printHistory("");
      printOutput("");
    }
    if (this.id === "backspace") {
      let output = reverseNumFormat(getOutput()).toString();
      if (output) {
        //if output has a value
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      let output = getOutput();
      let history = getHistory();
      if(output == "" && history != "") {
        if(isNaN(history[history.length - 1])) {
            history = history.substr(0, history.length - 1);
        }
      }
      if (output != "" || history != "") {
        // condition? true : false
        output = output == ""?
        output : reverseNumFormat(output);
        history = history + output;
        if(this.id == "=") {
          let result = eval(history);
          printOutput(result);
          printHistory("");
        }

        else {
          history = history + this.id;
          printHistory(history);
          printOutput("")
        }
      }
    }
  });
}

const number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function() {
    let output = reverseNumFormat(getOutput());
    if (output != NaN) {
      // if iit is a number
      output = output + this.id;
      printOutput(output);
    }
  });
}
