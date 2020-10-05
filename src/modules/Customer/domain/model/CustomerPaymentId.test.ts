import * as faker from 'faker';

import {CustomerPaymentId} from './CustomerPaymentId';

describe('customerPaymentId', () => {
  it('should return error when PaymentId length larger than 255', () => {
    expect.hasAssertions();
    const customerPaymentIdResult = CustomerPaymentId.create(faker.random.alphaNumeric(256));
    if (customerPaymentIdResult.isOk()) {
      throw new Error('customerPaymentIdResult.isOk');
    }
    expect(customerPaymentIdResult.error.message).toBe('paymentIdは255文字以内にしてください');
  });

  it('should return error when PaymentId is empty', () => {
    expect.hasAssertions();
    const customerPaymentIdResult = CustomerPaymentId.create('  ');
    if (customerPaymentIdResult.isOk()) {
      throw new Error('customerPaymentIdResult.isOk');
    }
    expect(customerPaymentIdResult.error.message).toBe('paymentIdが空です');
  });

  it('should return value when valid value', () => {
    expect.hasAssertions();
    const paymentId = faker.random.alphaNumeric(254);
    const customerPaymentIdResult = CustomerPaymentId.create(paymentId);
    if (customerPaymentIdResult.isErr()) {
      throw new Error('customerPaymentIdResult.isErr');
    }
    expect(customerPaymentIdResult.value.props.value).toBe(paymentId);
  });
});
