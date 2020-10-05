import * as faker from 'faker';

import {OwnerName} from './OwnerName';

describe('ownerName', () => {
  it('should return error when name length larger than 255', () => {
    expect.hasAssertions();
    const ownerNameResult = OwnerName.create(faker.random.alphaNumeric(256));
    if (ownerNameResult.isOk()) {
      throw new Error('ownerNameResult.isOk');
    }
    expect(ownerNameResult.error.message).toBe('nameは255文字以内にしてください');
  });

  it('should return error when name is empty', () => {
    expect.hasAssertions();
    const ownerNameResult = OwnerName.create('');
    if (ownerNameResult.isOk()) {
      throw new Error('ownerNameResult.isOk');
    }
    expect(ownerNameResult.error.message).toBe('nameが空です');
  });

  it('should return value when valid value', () => {
    expect.hasAssertions();
    const name = faker.name.firstName();
    const ownerNameResult = OwnerName.create(name);
    if (ownerNameResult.isErr()) {
      throw new Error('ownerNameResult.isErr');
    }
    expect(ownerNameResult.value.props.value).toBe(name);
  });
});
