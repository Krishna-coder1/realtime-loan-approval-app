import { Endpoints } from "@/endpoints/EndPoints";
import { Roles } from "@/enums/Roles";
import processor from ".";

export function urlProcessor(role: Roles, endpoint: processor): Endpoints {
  switch (role) {
    case Roles.VENDOR:
      if (endpoint === "latest_loan") {
        return Endpoints.VENDOR_LATEST_LOAN;
      } else {
        return Endpoints.VENDOR_LOANS_LIST;
      }
    case Roles.BFB:
      if (endpoint === "latest_loan") {
        return Endpoints.CUSTOMER_LATEST_LOAN;
      } else {
        return Endpoints.CUSTOMERS_LOANS_LIST;
      }
  }
}
