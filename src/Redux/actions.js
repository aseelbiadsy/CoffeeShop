export const updateQuantity = (orderId, newQuantity) => ({
    type: 'UPDATE_QUANTITY',
    payload: { orderId, newQuantity },
  });
  