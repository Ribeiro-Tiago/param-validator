/**
 * @author Tiago Ribeiro - www.tiago-ribeiro.com
 * @description Function that validates function parameteres and throws informative error when 
 * an argument isn't up to par, according to the validations.
 * @see https://github.com/Ribeiro-Tiago/param-validator
 * @copyright MIT license, 2018
 * @version 1.0.1
 */

(function(){
    'use strict'

    const util = require("utilities-js");
    const rules = {
        "required": (value) => {
            return !util.isEmpty(value);
        },
        "empty": util.isEmpty,
        "string": util.isString,
        "number": util.isNumber,
        "positive": util.isPositive,
        "dom": util.isDOM,
        "even": util.isEven,
        "positive": util.isPositive,
        "function": util.isFunction,
        "object": util.isObject,
        "array": util.isArray,
    };

    // validators is an array of arrays. Each array contains the validation rule for each argument, order is followed
    // e.g.: [{number}, {string, empty}] means that the first argument of the function must be a number and the second
    // must be string and not empty
    // if calling this from an arrow function, you have the specifically pass the 
    // arguments as an array (even if it's just one). if calling this from a 
    // non arrow function you can use the arguments variable. if using the arguments variable and want to not validate 
    // one of the arguments, leave the respective validator an empty array
    const paramValidator = function(args, validators = []) {
        // goes throught all validators
        validators.map((rule, index) => {
            // for each rule, checks what are the validation rules
            rule.map(item => {
                item = item.toLowerCase();
                // checks if rule exists 
                if (rules.hasOwnProperty(item)){
                    // if the rule isn't met, throws error
                    if (!rules[item](args[index])){
                        let caller = "[function name unknown]";

                        try { caller = arguments.callee.caller.name; } catch(err){}

                        throw new ParamValidatorError(index, caller, item, typeof args[index]);
                    }
                }
                else {
                    console.warn(`ATTENTION! Rule ${item} does not exist!`);
                }
            });
        });
    };

    class ParamValidatorError extends Error {
        constructor(paramNumber, funcName, trueType, paramType){
            super(`Expected argument ${paramNumber} of ${funcName} to be ${trueType} but got ${paramType} instead`);
        }
    }

    // add support for Node, React, Browser and AMD
    // node js 
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = paramValidator;
    }

    // react
    else if (typeof navigator != 'undefined' && navigator.product == 'ReactNative'){
        module.exports = paramValidator;
    }

    // AMD
    else if (typeof define === 'function' && define.amd) {
        define([], function() {
            return paramValidator;
        });
    }

    // browser
    else {
        window.paramValidator = paramValidator;
    }
})();