class AppError extends Error {
    statusCode: number
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

/* Autenticacion & Autorizacion */
class InvalidCredentialsError extends AppError {
    constructor() {
        super("Invalid username or password", 401)
    }
}

class UnauthorizedError extends AppError {
    constructor() {
        super("Unauthorized - Token missing or invalid", 401)
    }
}

/* Valiacion */
class ValidationError extends AppError {
    details: any
    constructor(details: any) {
        super("Validation failed", 400)
        this.details = details
    }
}

/* URLs & Usuarios */
class NotFoundError extends AppError {
    constructor() {
        super(`Not found`, 404)
    }
}

class AliasAlreadyExistsError extends AppError {
    constructor() {
        super("Custom alias already exists", 409)
    }
}

class UserAlreadyExistsError extends AppError {
    constructor() {
        super("User already exists", 409)
    }
}

class UserNotFoundError extends AppError {
    constructor() {
        super("User not found", 404)
    }
}

export { 
    AppError, 
    // Autenticacion & Autorizacion
    InvalidCredentialsError, UnauthorizedError, 
    // Validacion
    ValidationError, 
    // URLs & Usuarios
    NotFoundError, AliasAlreadyExistsError, UserAlreadyExistsError, UserNotFoundError, 
}