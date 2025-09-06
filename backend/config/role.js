import AccessControl from "accesscontrol";
const ac = new AccessControl();

ac.grant("customer")
  .readAny("product")
  .createOwn("order")
  .createOwn("order_item")
  .readOwn("order_item")
  .readOwn("order")
  .updateOwn("order")
  .deleteOwn("order")
  .readOwn("user")
  .updateOwn("user")
  .readAny("category")
  .readAny("promotion");

ac.grant("cashier")
  .extend("customer")
  .readAny("order")
  .updateAny("order")
  .readAny("order_item")
  .updateAny("order_item");

ac.grant("waiter").extend("customer");

ac.grant("kitchen")
  .readAny("order")
  .updateAny("order")
  .readAny("order_item")
  .updateAny("order_item");

ac.grant("admin")
  .extend("cashier")
  .readAny("user")
  .createAny("user")
  .updateAny("User")
  .createAny("category")
  .updateAny("category")
  .createAny("promotion")
  .updateAny("promotion")
  .createAny("product")
  .updateAny("product")
  .updateAny("order")
  .updateAny("order_item");


  export default ac;
