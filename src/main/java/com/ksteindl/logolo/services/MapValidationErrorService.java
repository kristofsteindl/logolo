package com.ksteindl.logolo.services;

import com.ksteindl.logolo.exceptions.FieldValidationException;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MapValidationErrorService {

    public void validate(BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = result.getFieldErrors().stream().collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
            throw new FieldValidationException(errorMap);
        }
    }
}
