package com.ksteindl.logolo.web;

import com.ksteindl.logolo.domain.User;
import com.ksteindl.logolo.domain.UserInput;
import com.ksteindl.logolo.services.MapValidationErrorService;
import com.ksteindl.logolo.services.UserService;
import com.ksteindl.logolo.validator.UserInputValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Controller
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;


    @Autowired
    private UserInputValidator userInputValidator;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody UserInput userInput, BindingResult result) {
        userInputValidator.validate(userInput, result);
        mapValidationErrorService.throwExceptionIfNotValid(result);
        User newUser = userService.saveUser(userInput);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

}


