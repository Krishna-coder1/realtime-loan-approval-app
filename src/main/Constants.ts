import { ConstantsImplementation } from "@/domain/interface/ConstantsImplementation";

class Constants implements ConstantsImplementation {
  DB_HOST: string;
  USER: string;
  DATABASE: string;
  PASSWORD: string;

  static withSpacing(str: string): string {
    console.log("Trimmed spaces around");
    return str.trim();
  }
  static get DB_HOST() {
    return this.withSpacing(process.env.DB_HOST);
  }

  static get USER() {
    return this.withSpacing(process.env.DB_USER_NAME);
  }

  static get DATABASE() {
    return this.withSpacing(process.env.DB_NAME);
  }

  static get PASSWORD() {
    return this.withSpacing(process.env.DB_PASSWORD);
  }
}

export default Constants;
