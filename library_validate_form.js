"use strict";
var RegisterForm = function() 
{ 
};

RegisterForm.prototype = new Validate(); //inherit

// Method to validate individual field
RegisterForm.prototype.validateField = function(fieldName, text) 
{
    var field = fields[fieldName];
	
    if (field.required) 
	{
        if ( this.isBlank(text) ) 
		{ 
			throw new Error(field.required); 
		} 
    }
	
    if (field.isEmail) 
	{
        if ( ! this.isEmail(text) ) 
		{ 
			throw new Error(field.isEmail);
		}
    }
	
	if (field.isPhone)
	{
        if ( ! this.isPhone(text) ) 
		{
			throw new Error(field.isPhone); 
		}
    }
};

// Error message methods
RegisterForm.prototype.setError = function( fieldName, message ) 
{
    $(fieldName + "_error").setAttribute("class", "error");
    $(fieldName + "_error").firstChild.nodeValue = message;
};

RegisterForm.prototype.clearError = function( fieldName, message ) 
{
    $(fieldName + "_error").setAttribute("class", "");
    $(fieldName + "_error").firstChild.nodeValue = message || "";
};

// Form methods
RegisterForm.prototype.resetForm = function() 
{
    for ( var fieldName in fields ) 
	{
        this.clearError(fieldName, fields[fieldName].message);
        $(fieldName).value = ""; //clear corresponding textbox 
    }
};

RegisterForm.prototype.validateForm = function() 
{
    var isOK = true;
	
    for ( var fieldName in fields ) 
	{
        this.clearError(fieldName);
        try 
		{
			this.validateField(fieldName, $(fieldName).value ); 
		} 
		
        catch (error)
		{
            isOK = false;
            this.setError( fieldName, error.message);           
        }
    }
    return isOK;
};