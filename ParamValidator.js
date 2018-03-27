/**
 * @author Tiago Ribeiro - www.tiago-ribeiro.com
 * @description Function that validates function parameteres and throws informative error when 
 * an argument isn't up to par, according to the validations.
 * @see https://github.com/Ribeiro-Tiago/param-validator
 * @copyright MIT license, 2017
 * @version 1.0.1
 */

import * as util from "./util";

const getExpectedType = (rules) => {
    var type = "undefined";

    rules.forEach(item => {
        item = item.toLowerCase();
        if (item.indexOf("string") !== -1)
        {
            type = "string";
            return;
        }
        
        if (item.indexOf("number") !== -1)
        {
            type = "number"
            return;
        }

        if (item.indexOf("function") !== -1)
        {
            type = "function";
            return;
        }

        if (item.indexOf("array") !== -1)
        {
            type = "array";
            return;
        }

        if (item.indexOf("object") !== -1)
        {
            type = "object";
            return;
        }
    });

    return type;
};

const rules = (() => {
    let arr = {};
    arr["notempty"] = (value) => {
        return !util.isEmpty(value);
    };
    
    delete util.default;
    
    for (var k in util){
        arr[k.toLowerCase()] = util[k];
    } 

    return arr;
})();

// validators is an array of arrays. Each array contains the validation rule for each argument, order is followed
// e.g.: [{isNumber}, {isString, notEmpty}] means that the first argument of the function must be a number and the second
// must be string and not empty
// if calling this from an arrow function, you have the specifically pass the 
// arguments as an array (even if it's just one). if calling this from a 
// non arrow function you can use the arguments variable. if using the arguments variable and want to not validate 
// one of the arguments, leave the respective validator an empty array
export default validate = function(args, validators = []) {
    // goes throught all validators
    validators.map((rule, index) => {
        // for each rule, checks what are the validation rules
        rule.map(item => {
            item = item.toLowerCase();
            // checks if rule exists 
            if (rules.hasOwnProperty(item)){
                // if the rule isn't met, throws error
                if (!rules[item](args[index])){
                    throw new ParamValidatorError(index, arguments.callee.caller.name, getExpectedType(rule), typeof args[index]);
                }
            }
            else {
                console.warn($`ATTENTION! Rule ${item} does not exist!`);
            }
        });
    });
};

class ParamValidatorError extends Error {
    constructor(paramNumber, funcName, trueType, paramType){
        super(`Expected argument ${paramNumber} of ${funcName} to be ${trueType} but got ${paramType} instead`);
    }
}