
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationOptions,
    registerDecorator
} from 'class-validator';
import User from '../../../entity/User';


@ValidatorConstraint({ async: true })
class IsUsernameAlreadyUsedConstraint
    implements ValidatorConstraintInterface {
    async validate(username: string) {

        const user = await User.findOne({ where: { username } });

        return !user;
    };

}


export default function IsUsernameAlreadyUsed(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUsernameAlreadyUsedConstraint
        });
    }
}