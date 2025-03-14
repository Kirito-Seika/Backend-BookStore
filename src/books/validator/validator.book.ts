import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

//Validate mainText
@ValidatorConstraint({ async: false })
export class IsMainTextValidConstraint implements ValidatorConstraintInterface {
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
      return 'Tên sách không được để trống.';
    }
    if (value.length < 6) {
      return 'Tên sách phải có ít nhất 6 ký tự.';
    }
    if (!/^[a-zA-Z]/.test(value)) {
      return 'Tên sách phải bắt đầu bằng chữ cái.';
    }
    return 'Tên sách không hợp lệ';
  }
}

//Validate author
@ValidatorConstraint({ async: false })
export class IsAuthorValidConstraint implements ValidatorConstraintInterface {
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
      return 'Tên tác giả không được để trống.';
    }
    if (value.length < 6) {
      return 'Tên tác giả phải có ít nhất 6 ký tự.';
    }
    if (!/^[a-zA-Z]/.test(value)) {
      return 'Tên tác giẩ phải bắt đầu bằng chữ cái.';
    }
    return 'Tên tác giả không hợp lệ';
  }
}

// Validate Price (Chỉ nhận số nguyên, không âm)
@ValidatorConstraint({ async: false })
export class IsPriceValidConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (value === null || value === undefined || value === '') {
      return false;
    }
    if (!/^\d+$/.test(value)) { // Chỉ cho phép số nguyên dương
      return false;
    }
    return parseInt(value, 10) >= 0; // Không được là số âm
  }

  defaultMessage(args: ValidationArguments) {
    const value = args.value;
    if (value === null || value === undefined || value === '') {
      return 'Giá không được để trống.';
    }
    if (!/^\d+$/.test(value)) {
      return 'Giá chỉ được chứa các số nguyên.';
    }
    if (parseInt(value, 10) < 0) {
      return 'Giá không được là số âm.';
    }
    return '';
  }
}

// Validate Quantity
@ValidatorConstraint({ async: false })
export class IsQuantityValidConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (value === null || value === undefined || value === '') {
      return false;
    }
    if (!/^\d+$/.test(value)) { // Chỉ cho phép số nguyên dương
      return false;
    }
    return parseInt(value, 10) >= 0; // Không được là số âm
  }

  defaultMessage(args: ValidationArguments) {
    const value = args.value;
    if (value === null || value === undefined || value === '') {
      return 'Số lượng không được để trống.';
    }
    if (!/^\d+$/.test(value)) {
      return 'Số lượng chỉ được chứa các số nguyên.';
    }
    if (parseInt(value, 10) < 0) {
      return 'Số lượng không được là số âm.';
    }
    return '';
  }
}

//Validate mainText
@ValidatorConstraint({ async: false })
export class IsCategoryValidConstraint implements ValidatorConstraintInterface {
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
      return 'Thể loại sách không được để trống.';
    }
    if (value.length < 6) {
      return 'Thể loại sách phải có ít nhất 6 ký tự.';
    }
    if (!/^[a-zA-Z]/.test(value)) {
      return 'Thể loại sách bắt đầu bằng chữ cái.';
    }
    return 'Thể loại sách không hợp lệ';
  }
}