import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationOptions,
    registerDecorator
} from 'class-validator';


@ValidatorConstraint({ async: true })
class StringLengthValidatorConstraint
    implements ValidatorConstraintInterface {
    min_length: number | null;
    max_length: number | null;

    constructor(min: number | null, max: number | null) {
        this.min_length = min;
        this.max_length = max;
    }

    async validate(username: string) {
        const name = username.trimStart().trimEnd().replace(/\s+/g, " ");
        let maxLength: boolean = true;

        if (this.max_length) {
            maxLength = name.length <= this.max_length;
        }

        let minLength: boolean = true;

        if (this.min_length) {
            minLength = name.length >= this.min_length;
        }

        return (minLength && maxLength);
    };

}


export default function StringLength(min: number | null, max: number | null, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {

        const IValidate: ValidatorConstraintInterface = new StringLengthValidatorConstraint(min, max);

        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IValidate
        });
    }
}