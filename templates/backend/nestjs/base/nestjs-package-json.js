export const NestjsPackageJsonTemplate = {
    name: 'startease nestjs project',
    private: true,
    version: '1.0.0',
    description: 'NestJs project generated using startease CLI tool',
    license: 'MIT',
    scripts: {
        build: 'nest build',
        format: 'prettier --write "src/**/*.ts" "test/**/*.ts"',
        start: 'nest start',
        'start:dev': 'nest start --watch',
        'start:debug': 'nest start --debug --watch',
        'start:prod': 'node dist/main',
        lint: 'eslint "{src,apps,libs,test}/**/*.ts" --fix',
        test: 'jest',
        'test:watch': 'jest --watch',
        'test:cov': 'jest --coverage',
        'test:debug':
            'node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand',
        'test:e2e': 'jest --config ./test/jest-e2e.json'
    },
    dependencies: {
        '@nestjs/common': '^10.0.0',
        '@nestjs/core': '^10.0.0',
        '@nestjs/platform-express': '^10.0.0',
        'class-transformer': '^0.5.1',
        'class-validator': '^0.14.0',
        dotenv: '^16.3.1',
        helmet: '^7.0.0',
        'reflect-metadata': '^0.1.13',
        rxjs: '^7.8.1'
    },
    devDependencies: {
        '@nestjs/cli': '^10.0.1',
        '@nestjs/schematics': '^10.0.1',
        '@nestjs/testing': '^10.0.0',
        '@swc/cli': '^0.1.62',
        '@swc/core': '^1.3.64',
        '@types/express': '^4.17.17',
        '@types/jest': '^29.5.2',
        '@types/node': '^20.3.1',
        '@types/supertest': '^2.0.12',
        '@typescript-eslint/eslint-plugin': '^5.59.11',
        '@typescript-eslint/parser': '^5.59.11',
        eslint: '^8.42.0',
        'eslint-config-prettier': '^8.8.0',
        'eslint-plugin-prettier': '^4.2.1',
        jest: '^29.5.0',
        prettier: '^2.8.8',
        'source-map-support': '^0.5.21',
        supertest: '^6.3.3',
        'ts-jest': '^29.1.0',
        'ts-loader': '^9.4.3',
        'ts-node': '^10.9.1',
        'tsconfig-paths': '^4.2.0',
        typescript: '^5.1.3'
    },
    jest: {
        moduleFileExtensions: ['js', 'json', 'ts'],
        rootDir: 'src',
        testRegex: '.*\\.spec\\.ts$',
        transform: {
            '^.+\\.(t|j)s$': 'ts-jest'
        },
        collectCoverageFrom: ['**/*.(t|j)s'],
        coverageDirectory: '../coverage',
        testEnvironment: 'node'
    }
};


export const NEST_MONGOOSE_PACKAGE = {
    "dependencies": {
        "@nestjs/mongoose": "^10.0.1",
        "mongoose": "^7.5.2",
    }
}