/* eslint-disable jest/require-top-level-describe */
import {createTestContext} from '~/graphql/utils/__testHelpers';

const ctx = createTestContext();
test('ensures that a owner can create', async () => {
  expect.hasAssertions();
  const {query, mutate} = ctx.client;
  // Create a new Owner
  const ownerCreateResult = await mutate({
    mutation: `
    mutation CreateOwner{
      ownerCreate(input:{name: "test-owner"}){
        owner {
          name
          id
          paymentId
        }
        userErrors{
          paths
          message
        }
      }
    }
  `,
  });
  expect(ownerCreateResult).toMatchInlineSnapshot(`
    Object {
      "data": Object {
        "ownerCreate": Object {
          "owner": Object {
            "id": "T3duZXI9PT09PT09MjAzZDkyN2ItMDAwMi00YTY2LWFjOTQtMTdlZjE1Y2Y0ZDc0",
            "name": "test-owner",
            "paymentId": null,
          },
          "userErrors": Array [],
        },
      },
      "errors": undefined,
      "extensions": undefined,
      "http": Object {
        "headers": Headers {
          Symbol(map): Object {},
        },
      },
    }
  `);
  // fetch Owner
  const ownerFetchResult = await query({
    query: `
    query owner($ownerId: String!) {
      owner(ownerId: $ownerId){
        name
        id
        paymentId
      }
    }
  `,
    variables: {
      ownerId: (ownerCreateResult as any).data.ownerCreate.owner.id,
    },
  });
  expect(ownerFetchResult).toMatchInlineSnapshot(`
    Object {
      "data": undefined,
      "errors": Array [
        [ValidationError: Variable "$ownerId" of type "String!" used in position expecting type "ID!".],
      ],
      "extensions": undefined,
      "http": Object {
        "headers": Headers {
          Symbol(map): Object {},
        },
      },
    }
  `);
});
