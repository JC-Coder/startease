export const Postgres_Database_Server = `version: '0.0.1'
services:
  startease-db:
    image: postgres:15
    ports:
      - 5435:5432
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: startease
    networks:
      - typeorm-pro
networks:
  typeorm-pro:
`;