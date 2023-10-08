const status = {
  ACTIVE: 1,
  INACTIVE: 3
}

const typeDiscount = {
  "%": "Phần trăm",
  "VND": "VNĐ"
}
const statusCart = {
  TEMP: -1,
  WAIT_FOR_CONFIRMATION: 1,
  WAITING_FOR_PICKUP: 2,
  ON_DELIVERY: 3,
  DELIVERED: 4,
  CANCELLED: 5,
  DELETED: 6
}
module.exports = {
  status,
  typeDiscount,
  statusCart
};
