# currently under construction
No proper support or test for anything other than react native

## TODO
- add / test support for other platforms
- optimize
- Allow single value params and validation rules

# Purpose
Package that validates function params

# Usage
This function takes 2 arguments, `` params `` to be validated and `` validationRules ``. Currently both need to be an array even if it's just one param / validation rule.
It's pretty straightforawrd. All you have to do is `` paramValidator([params], [validationRules]); `` . The validation rules are directly correlated with the params, i.e.: validationRules array #1 is for entry #1 on params array.
If the every param passes the validation the code will continue to run, else it'll throw an error and thus this function doesn't need to return anything.

## Example
For example 
```sh
paramValidator([name, email], [["required"], ["required", "email"]]);
```
Means that name is required and email is required and has to be an email.

## Avaiable rules
These validation rules are based on [utilities-js](https://www.github.com/ribeiro-tiago/utilities)
- required
- empty
- string
- number
- positive
- dom
- even
- positive
- function
- object
- array

# Copyright
MIT License