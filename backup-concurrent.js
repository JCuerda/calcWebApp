// JavaScript source code
var calculatorModel = (function () {

    var data = {

        initial_value: 0,
        initial_result: 0,
        operation: "",
        results: 0,
        calculation: {
            numbersToBeProcess: []
        },
        numberToBeCalculate: 0
    };

    return {

        calculate: function (number, operation) {
            if (data.result == undefined) {
                switch (operation) {
                    case '+':
                        data.results = Number(data.initial_value) + Number(number);
                        break;
                    case '-':
                        data.results = Number(data.initial_value) - Number(number);
                        break;
                    case '*':
                        data.results = Number(data.initial_value) * Number(number);
                        break;
                    case '/':
                        data.results = Number(data.initial_value) / Number(number);
                        break;
                    default:
                        break;
                }
            } else {
                switch (operation) {
                    case '+':
                        data.results = data.results + Number(number);
                        break;
                    case '-':
                        data.results = data.results - Number(number);
                        break;
                    case '*':
                        data.results = data.results * Number(number);
                        break;
                    case '/':
                        data.results = data.results / Number(number);
                        break;
                    default:
                        break;
                }
            }
        },

        checkInitialValue: function () {
            return (data.initial_value != 0) ? true : false;
        },

        getResult: function(){
            return data.results;
        },

        getInitialValue: function(){
            return data.initial_value;
        },

        setInitialValue: function (number) {
            data.initial_value = number;
        },

        setOperation: function(operation){
            data.operation = operation;
        },

        getOperation: function () {
            return data.operation;
        },

        setInitialResult: function (result) {
            data.initial_result = result;
        },

        getInitialResult: function () {
            return data.initial_result;
        },

        setNumberToBeCalculate: function(number){
            data.numberToBeCalculate = number;
        },

        getNumberToBeCalculate: function(){
            return data.numberToBeCalculate;
        },

        processCalculation: function(number){
            var process = this.getOperation();
            switch(process){
                case "+": 
                    data.results = Number(this.getNumberToBeCalculate()) + Number(number);
                    this.setNumberToBeCalculate(data.results);
                    // this.setInitialValue(data.results);
                    break;
                case "-": 
                    data.results = Number(this.getNumberToBeCalculate()) - Number(number);
                    this.setNumberToBeCalculate(data.results);
                    // this.setInitialValue(data.results);
                    break;
                case "*": 
                    data.results = Number(this.getNumberToBeCalculate()) * Number(number);
                    this.setNumberToBeCalculate(data.results);
                    // this.setInitialValue(data.results);
                    break;
                case "/": 
                    data.results = Number(this.getNumberToBeCalculate()) / Number(number);
                    this.setNumberToBeCalculate(data.results);
                    // this.setInitialValue(data.results);
                    break;
            }
        }
    };

})();

var calculatorView = (function () {

    var DOMStrings = {
        inputNumber: '.input_num',
        inputBox: 'input_box',
        inputOperation: '.input_operation',
        getResult: 'input_get_result',
        placeholder: 'placeholder'
    };

    return {

        //INSERT NUMBER TO THE TEXTBOX
        insertNumber: function(num){
            document.getElementById(DOMStrings.inputBox).value += num;
        },

        getDOMString: function (){
            return DOMStrings;
        },

        clearFields: function () {

            var fields = document.getElementById(DOMStrings.inputBox);
            fields.value = "";
        },

        addNumberToPlaceholder: function(n, operation){
            var value;
            value = " "+ n + " " + operation;
            document.getElementById(DOMStrings.placeholder).textContent += value;
        },
    };

})();

var calculatorController = (function (calcView, calcModel) {
        
    var setUpEventListener = function () {

        var DOM = calcView.getDOMString();
        var button = document.querySelectorAll(DOM.inputNumber);

        // ADDING TEXT TO THE INPUT BOX AFTER BUTTON CLICK
        for (var i = 0; i < button.length; i++) {
            button[i].addEventListener('click', function () {
                calcView.insertNumber(this.value);
            });
        }

        var operation = document.querySelectorAll(DOM.inputOperation);

        //ADDING OPERATOR
        for (var i = 0; i < operation.length; i++) {
            operation[i].addEventListener('click', function () {
                var val = document.getElementById(DOM.inputBox).value;
                var initialValueIsSet = calcModel.checkInitialValue();

                if (!initialValueIsSet && calcModel.getOperation() == "") {
                    calcModel.setNumberToBeCalculate(val);
                    calcModel.setOperation(this.innerHTML);
                    calcModel.setInitialValue(val);
                    calcView.addNumberToPlaceholder(val, this.innerHTML);
                } else {
                    calcModel.processCalculation(val);
                    calcModel.setOperation(this.innerHTML);
                    calcView.addNumberToPlaceholder(val, this.innerHTML);
                }
                
                //CLEARING THE INPUT FIELDS
                calcView.clearFields();
            });
           
        }
        var result = document.getElementById(DOM.getResult).addEventListener('click', getResult)
    };

    //DISPAY THE RESULT
    var getResult = function () {

        var result, DOMStrings;
        DOMStrings= calcView.getDOMString();
        calcModel.calculate(document.getElementById(DOMStrings.inputBox).value, calcModel.getOperation());
        calcView.clearFields();
        calcView.insertNumber(calcModel.getResult());
        calcModel.setInitialValue(calcModel.getResult());
    }   

    return {
        init: function () {
            console.log("Application Started..");
            setUpEventListener();
        }
    };

})(calculatorView, calculatorModel);

calculatorController.init();



/************************************************************
** PROBLEMS ENCOUNTERED DURING DEVELOPMENT OF THE PROJECT
*************************************************************
**
**
**
**
**
**
**
**
**
**
**
**
**
**
*/

