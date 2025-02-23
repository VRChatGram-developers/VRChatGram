// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { handler } from "./.next/standalone/server.mjs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(handler, { port: 3000 });
console.log("Server running on http://localhost:3000");
