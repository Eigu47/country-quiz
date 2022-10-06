import * as trpc from "@trpc/server";
import { z } from "zod";

import { getRandomCountry } from "../../utils/utils";
import { createRouter } from "./context";

export const countries = createRouter().query("getRandomCountry", {
  async resolve({ ctx }) {
    const country = getRandomCountry();

    return ctx.prisma.country.findUnique({
      where: { name: country },
    });
  },
});
