import { connect } from "@tidbcloud/serverless";
import { PrismaTiDBCloud } from "@tidbcloud/prisma-adapter";
import { PrismaClient } from "@prisma/client";
// setup
const connectionString = `${process.env.DATABASE_URL}`;

// Initialize Prisma Client
const connection = connect({ url: connectionString });
const adapter = new PrismaTiDBCloud(connection);
const prisma = new PrismaClient({ adapter });

export default prisma;
