import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationOptions,
    registerDecorator
} from 'class-validator';


@ValidatorConstraint({ async: true })
class IsRoleValidConstraint
    implements ValidatorConstraintInterface {

    async validate(role: number) {

        return role === 1 || role === 2 || role === 3;
    };

}

export default function IsRoleValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {

        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsRoleValidConstraint
        });
    }
}