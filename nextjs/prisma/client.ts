import { connect } from "@tidbcloud/serverless";
import { PrismaTiDBCloud } from "@tidbcloud/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// const connectionString = process.env.DATABASE_URL;

const connectionString = "mysql://bcaMvwfNrPfivyf.root:U1yNDTjudGkVPQ33@gateway01.ap-northeast-1.prod.aws.tidbcloud.com:4000/test?sslaccept=strict";
const connection = connect({ url: connectionString });
const adapter = new PrismaTiDBCloud(connection);
const prisma = new PrismaClient({ adapter });

export default prisma;
