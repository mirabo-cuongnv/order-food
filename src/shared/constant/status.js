export const STATE_PAYMENT = {
  REQUEST: 1,
  CONFIRM: 2,
  REJECT: 3,
  PAYMENT_ORDER: 4,
  ADMIN_UPDATE_WITHDRAW: 5,
  ADMIN_UPDATE_DEP: 6,
};

export const STATE_PAYMENT_CUSTOMER_VI = {
  REQUEST: 'Chờ xác nhận',
  CONFIRM: 'Thành công',
  REJECT: 'Từ chối',
  PAYMENT_ORDER: 'Tiền cơm',
  ADMIN_UPDATE_WITHDRAW: '',
  ADMIN_UPDATE_DEP: '',
};

export const STATE_PAYMENT_ADMIN_VI = {
  REQUEST: 'Xác nhận',
  CONFIRM: 'Đã xác nhận',
  REJECT: 'Đã từ chối',
  PAYMENT_ORDER: 'Tiền cơm',
  ADMIN_UPDATE_WITHDRAW: '',
  ADMIN_UPDATE_DEP: '',
};
