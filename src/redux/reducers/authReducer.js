import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS } from '@/constants/constants';

const initState = null;
// {
// id: 'test-123',
// role: 'ADMIN',
// provider: 'password'
// };

export default (state = initState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        id: action.payload.id,
        shopId: action.payload.shopId,
        shop: action.payload.shop,
        role: action.payload.role,
        provider: action.payload.provider,
        warehouseId: action.payload.warehouseId
      };
    case SIGNOUT_SUCCESS:
      return null;
    default:
      return state;
  }
};
