import   AccessControl  from "accesscontrol";
const ac = new AccessControl();

ac.grant("admin").readAny("user")