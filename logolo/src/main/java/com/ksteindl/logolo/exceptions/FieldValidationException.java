package com.ksteindl.logolo.exceptions;

import java.util.Map;

public class FieldValidationException extends RuntimeException {

    private Map<String, String> errorMap;

    public FieldValidationException(Map<String, String> errorMap) {
        this.errorMap = errorMap;
    }

    public Map<String, String> getErrorMap() {
        return errorMap;
    }
}
