import * as trpc from "@trpc/server";
import { z } from "zod";

import { createRouter } from "./context";

export const script = createRouter()
  .mutation("post", {
    input: z.array(
      z.object({
        name: z.string(),
        code: z.string(),
        latlng: z.array(z.number()),
        capital: z.string(),
        altSpellings: z.array(z.string()),
        regionId: z.string(),
        subregionId: z.string(),
        languages: z.array(z.string()),
        borders: z.array(z.string().optional()),
        area: z.number(),
        population: z.number(),
        map: z.string(),
        flag: z.string(),
      })
    ),
    async resolve({ input, ctx }) {
      const flatRegions = Array.from(
        new Set(input.flatMap((country) => country.regionId))
      );

      const flatSubregions = Array.from(
        new Set(input.flatMap((country) => country.subregionId))
      ).sort();

      await ctx.prisma.$transaction([
        ...flatRegions.map((region) =>
          ctx.prisma.region.upsert({
            where: { name: region },
            create: { name: region },
            update: {},
          })
        ),
        ...flatSubregions.map((subregion) =>
          ctx.prisma.subregion.upsert({
            where: { name: subregion },
            create: { name: subregion },
            update: {},
          })
        ),
      ]);

      await ctx.prisma.country.createMany({
        data: input.map((country) => {
          return {
            ...country,
            borders: undefined,
          };
        }),
      });

      return await ctx.prisma.$transaction([
        ...input
          .filter((country) => country.borders.length > 0)
          .map((country) =>
            ctx.prisma.country.update({
              where: { name: country.name },
              data: {
                borders: {
                  connect: country.borders.map((border) => ({
                    name: border,
                  })),
                },
              },
            })
          ),
      ]);
    },
  })
  .query("get", {
    input: z.string().optional(),
    async resolve({ input, ctx }) {
      if (!input)
        throw new trpc.TRPCError({
          code: "BAD_REQUEST",
          message: "No region provided",
        });

      return await ctx.prisma.region.findUnique({
        where: { name: input },
        select: {
          countries: true,
        },
      });
    },
  });
