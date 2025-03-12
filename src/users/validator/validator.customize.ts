import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

//Validate name
@ValidatorConstraint({ async: false })
export class IsNameValidConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (value === null || value === undefined || value === '') {
      return false;
    }
    if (value.length < 6) {
      return false;
    }
    return /^[a-zA-Z]/.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    const value = args.value;
    if (value === null || value === undefined || value === '') {
      return 'Tên không được để trống.';
    }
    if (value.length < 6) {
      return 'Tên phải có ít nhất 6 ký tự.';
    }
    if (!/^[a-zA-Z]/.test(value)) {
      return 'Tên phải bắt đầu bằng chữ cái.';
    }
    return 'Tên không hợp lệ';
  }
}

//Validate Email
@ValidatorConstraint({ async: false })
export class IsEmailValidConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (value === null || value === undefined || value === '') {
      return false;
    }
    const atIndex = value.indexOf('@');
    if (atIndex === -1) {
      return false;
    }
    const localPart = value.split('@')[0];
    const domainPart = value.split('@')[1];
    if (/[^a-zA-Z0-9]/.test(localPart)) {
      return false;
    }
    if (!/[a-zA-Z]/.test(localPart)) {
      return false;
    }
    if (domainPart !== 'gmail.com') {
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    const value = args.value;
    if (value === null || value === undefined || value === '') {
      return 'Email không được để trống.';
    }
    const localPart = value.split('@')[0];
    if (/[^a-zA-Z0-9]/.test(localPart)) {
      return 'Email chỉ được chứa bao gồm chữ cái và số!';
    }
    if (!/[a-zA-Z]/.test(localPart)) {
      return 'Email phải chứa ít nhất một chữ cái';
    }
    if (!value.endsWith('@gmail.com')) {
      return 'Email phải có đuôi @gmail.com';
    }
    return 'Email không hợp lệ';
  }
}

//Validate Password
@ValidatorConstraint({ async: false })
export class IsPasswordValidConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (value === null || value === undefined || value === '') {
      return false;
    }
    if (value.length < 6) {
      return false;
    }
    const hasDiacritics =
      /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]/i.test(
        value,
      );
    if (/\s/.test(value)) {
      return false;
    }
    return !hasDiacritics;
  }

  defaultMessage(args: ValidationArguments) {
    const value = args.value;
    if (value === null || value === undefined || value === '') {
      return 'Mật khẩu không được để trống.';
    }
    if (value.length < 6) {
      return 'Mật khẩu phải có ít nhất 6 ký tự.';
    }
    const hasDiacritics =
      /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]/i.test(
        value,
      );
    if (hasDiacritics) {
      return 'Mật khẩu không được chứa chữ cái có dấu.';
    }
    if (/\s/.test(value)) {
      return 'Mật khẩu không được chứa ký tự khoảng cách.';
    }
    return 'Mật khẩu không hợp lệ';
  }
}

// Validate Phone
@ValidatorConstraint({ async: false })
export class IsPhoneValidConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (value === null || value === undefined || value === '') {
      return false;
    }
    if (!/^\d+$/.test(value)) {
      return false;
    }
    return value.length >= 10;
  }

  defaultMessage(args: ValidationArguments) {
    const value = args.value;
    if (value === null || value === undefined || value === '') {
      return 'Số điện thoại không được để trống.';
    }
    if (!/^\d+$/.test(value)) {
      return 'Số điện thoại chỉ được chứa các ký tự số.';
    } else if (value.length < 10) {
      return 'Số điện thoại phải có ít nhất 10 ký tự.';
    }
    return '';
  }
}
