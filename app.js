// Author: JCuerda (c) 2018
// Version: 1.0
// Description: Simple Calculator application which uses Modular Design Pattern

/**
 * Handles the main data structure of the Application.
 */
var calculatorModel = (function () {

    var data = {
        initial_value: 0,
        operation: "",
        results: 0,
        numberToBeCalculate: 0
    };

    return {

        /**
         * Check if the Initial Value is set
         * @returns True if initial value is set otherwise returns false.
         */
        checkInitialValue: function () {
            return (data.initial_value != 0) ? true : false;
        },

        /**
         * @returns the result of the calculation
         */
        getResult: function(){
            return data.results;
        },

        /**
         * @returns the initial value set in the Calculator Model
         */
        getInitialValue: function(){
            return data.initial_value;
        },

        /**
         * Set the initial value to be used.
         * @param number set initial value
         */
        setInitialValue: function (number) {
            data.initial_value = number;
        },

        /**
         * Set the operation to be used.
         */
        setOperation: function(operation){
            data.operation = operation;
        },

        /**
         * @returns Operation Symbol
         */
        getOperation: function () {
            return data.operation;
        },

        /**
         * Set the number to be calculated.
         */
        setNumberToBeCalculate: function(number){
            data.numberToBeCalculate = number;
        },

        /**
         * Get the number to be calculated.
         * @returns the number to be calculated.
         */
        getNumberToBeCalculate: function(){
            return data.numberToBeCalculate;
        },

        /**
         * Main method that performs the calculation.
         * @param {*} number number to be used for the calculation process
         */
        processCalculation: function(number){
            var process = this.getOperation();
            switch(process){
                case "+": 
                    data.results = Number(this.getNumberToBeCalculate()) + Number(number);
                    this.setNumberToBeCalculate(data.results);
                    break;
                case "-": 
                    data.results = Number(this.getNumberToBeCalculate()) - Number(number);
                    this.setNumberToBeCalculate(data.results);
                    break;
                case "*": 
                    data.results = Number(this.getNumberToBeCalculate()) * Number(number);
                    this.setNumberToBeCalculate(data.results);
                    break;
                case "/": 
                    data.results = Number(this.getNumberToBeCalculate()) / Number(number);
                    this.setNumberToBeCalculate(data.results);
                    break;
            }
        },

         /**
         * Clear all data
         */
        clearData: function(){
            data.initial_value = 0;
            data.operation = "";
            data.results = 0;
            data.numberToBeCalculate = 0;
        },
        
        /**
         * Unset Operation
         */
        clearOperation: function(){
            data.operation = "";
        }
    };

})();

/**
 * Handles the Presentation and View of the Application
 */
var calculatorView = (function () {

    //List of HTML classes and Ids used in the Application.
    var DOMStrings = {
        inputNumber: '.input_num',
        inputBox: 'input_box',
        inputOperation: '.input_operation',
        getResult: 'input_get_result',
        placeholder: 'placeholder',
        clear: 'clear'
    };

    return {
        /**
         * @param num number to be insert to the input box
         */
        insertNumber: function(num){
            document.getElementById(DOMStrings.inputBox).value += num;
        },

        /**
         * @returns list of HTML classes and Ids used in the application.
         */
        getDOMString: function (){
            return DOMStrings;
        },

        /**
         * Method to clear the input box.
         */
        clearFields: function () {
            var fields = document.getElementById(DOMStrings.inputBox);
            fields.value = "";
        },

        /**
         * Method to add number in the placeholder.
         * @param n number to be added in the placeholder.
         */
        addNumberToView: function(n){
            document.getElementById(DOMStrings.placeholder).textContent += n;
        },

        /**
         * Method to add Operation symbol to the placeholder.
         * @param operation operation to be added to the placeholder.
         */
        addOperationToView: function(operation){
            document.getElementById(DOMStrings.placeholder).textContent += operation;
        },

        /**
         * Method to clear the placeholder.
         */
        clearPlaceholder: function(){
            document.getElementById(DOMStrings.placeholder).textContent = "";
        },

    };

})();

/**
 * Main Application Controller
 * @param calcModel Model Module of the Application
 * @param calcView  View Module of the Application
 */

var calculatorController = (function (calcView, calcModel) {
        
    /**
     * Method to Set-Up EventListeners
     */
    var setUpEventListener = function () {

        /**
         * @var DOM List of HTML classess and Ids used in the entire application
         * @var nString Used to get multiple digit numbers
         * @var button variable that holds all the button values
         */

        //Initializing required variables
        var DOM = calcView.getDOMString();
        var button = document.querySelectorAll(DOM.inputNumber);
        var nString = "";
        
        // Adding text to the Input Box after button click
        for (var i = 0; i < button.length; i++) {
            button[i].addEventListener('click', function () {
                calcView.insertNumber(this.value);
                nString += this.value
                calcView.addNumberToView(this.value);
            });
        }

        // Selecting all the input operations
        var operation = document.querySelectorAll(DOM.inputOperation);

        // Main Process / Operation Entry Point
        for (var i = 0; i < operation.length; i++) {
            operation[i].addEventListener('click', function () {
               
                var val = document.getElementById(DOM.inputBox).value;
                var initialValueIsSet = calcModel.checkInitialValue();

                if (!initialValueIsSet && calcModel.getOperation() == "") {
                    initializeValue(nString);
                    nString = "";
                    calcModel.setNumberToBeCalculate(val);
                    calcModel.setOperation(this.innerHTML);
                    (this.innerHTML == '/' || this.innerHTML == '*') 
                        ? calcModel.processCalculation(1) : calcModel.processCalculation(0);

                    //Clear the place holder
                    calcView.clearPlaceholder();

                    //Set values to the placeholder
                    calcView.addNumberToView(calcModel.getResult());
                    calcView.addOperationToView(this.innerHTML);
                    
                } else if (val != ""){

                    //Start calculation
                    calcModel.processCalculation(val);
                    calcModel.setOperation(this.innerHTML);
                    calcView.clearPlaceholder();

                    //Set placeholder's value
                    calcView.addNumberToView(calcModel.getResult());
                    calcView.insertNumber(calcModel.getResult());
                    calcView.addOperationToView(this.innerHTML);

                } else {

                    //Unset the Operation
                    calcModel.clearOperation();

                    //Re-Set the Operation
                    calcModel.setOperation(this.innerHTML)
                    
                    //Unset Current Formula in the placeholder
                    calcView.clearPlaceholder();

                    //Re-Set the new value and operation in the placeholder
                    calcView.addNumberToView(calcModel.getResult());

                    calcView.addOperationToView(this.innerHTML);
                }
                calcView.clearFields();
            });
        }
        
        /**
         * Method that triggers when equal sign is clicked.
         */
        var result = document.getElementById(DOM.getResult).addEventListener('click', getResult);

        /**
         * Method the triggers Clear Model and View Data
         */
        var clear = document.getElementById(DOM.clear).addEventListener('click', function(){
            calcModel.clearData();
            calcView.clearFields();
            calcView.clearPlaceholder();
        });
    };

    /**
     * Method to Display the Result
     */
    var getResult = function () {
        var DOMStrings;
        DOMStrings= calcView.getDOMString();
        calcModel.processCalculation(document.getElementById(DOMStrings.inputBox).value);
        calcView.clearPlaceholder();
        calcView.addNumberToView(calcModel.getResult());
        calcView.clearFields();
        calcModel.clearOperation();
        calcView.insertNumber(calcModel.getResult());
    }
    
    /**
     * Method to Initialize the Initial Result
     * @param {number} n Number to Add to the View Placeholder
     */
    var initializeValue = function(n){
        calcView.addNumberToView(n);
        calcModel.setInitialValue(n);
    }

    return {
        /**
         * Initialize the Controller / Application
         */
        init: function () {
            console.log("Application Started..");
            setUpEventListener();
        }
    };

})(calculatorView, calculatorModel);

// Initialize the Application
calculatorController.init();
