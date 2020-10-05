import * as faker from 'faker';

import {OwnerPaymentDestinationId} from './OwnerPaymentDestinationId';

describe('ownerPaymentDestinationId', () => {
  it('should return error when id length is longer 255', () => {
    expect.hasAssertions();
    const destinationIdResult = OwnerPaymentDestinationId.create(faker.random.alphaNumeric(256));
    if (destinationIdResult.isOk()) {
      throw new Error('destinationIdResult.isOk');
    }
    expect(destinationIdResult.error.message).toBe('paymentDestinationIdは255よりも短くしてください');
  });

  it('should return error when id is empty string', () => {
    expect.hasAssertions();
    const destinationIdResult = OwnerPaymentDestinationId.create('    ');
    if (destinationIdResult.isOk()) {
      throw new Error('destinationIdResult.isOk');
    }
    expect(destinationIdResult.error.message).toBe('paymentDestinationIdが空です');
  });

  it('should return paymentDestinationId when pass valid value', () => {
    expect.hasAssertions();
    const id = faker.random.alphaNumeric(254);
    const destinationIdResult = OwnerPaymentDestinationId.create(id);
    if (destinationIdResult.isErr()) {
      throw new Error('destinationIdResult.isErr');
    }
    expect(destinationIdResult.value.props.value).toBe(id);
  });
});
