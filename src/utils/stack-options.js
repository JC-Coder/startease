export const STACK_OPTIONS = {
  stacks: [
    {
      name: "backend",
      frameworks: [
        {
          name: "nestjs",
          key: "nestjs",
        },
        {
          name: "expressjs",
          key: "expressjs",
        },
      ],
      databases: [
        {
          name: "mongodb",
          key: "-db1",
        },
        {
          name: "postgresql",
          key: "-db2",
        },
        {
          name: "mysql",
          key: "-db3",
        },
      ],
      orms: [
        {
          name: "mongoose",
          key: "-orm1",
        },
        {
          name: "typeorm",
          key: "-orm2",
        },
      ],
    },
    {
      name: "frontend",
      frameworks: [
        {
          name: "reactjs",
          key: "reactjs",
        },
      ],
    },
  ],
};
