
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationOptions,
    registerDecorator
} from 'class-validator';
import User from '../../../entity/User';


@ValidatorConstraint({ async: true })
class IsEmailAlreadyUsedConstraint
    implements ValidatorConstraintInterface {
    async validate(email: string) {

        const user = await User.findOne({ where: { email } });

        return !user;
    };

}


export default function IsEmailAlreadyUsed(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyUsedConstraint
        });
    }
}