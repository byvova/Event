import { neon } from "@neondatabase/serverless";

const NullishQueryFunction = () => {
  throw new Error(
    "No database connection string was provided to `neon()`. Perhaps process.env.DATABASE_URL has not been set",
  );
};
NullishQueryFunction.transaction = () => {
  throw new Error(
    "No database connection string was provided to `neon()`. Perhaps process.env.DATABASE_URL has not been set",
  );
};

// Main database connection (auth tables)
const sql = process.env.DATABASE_URL
  ? neon(process.env.DATABASE_URL)
  : NullishQueryFunction;

// Customer profiles database connection
const customerProfilesSql = process.env.DATABASE_URL_1
  ? neon(process.env.DATABASE_URL_1)
  : NullishQueryFunction;

// Add customerProfiles property to main sql function
sql.customerProfiles = customerProfilesSql;

export default sql;
