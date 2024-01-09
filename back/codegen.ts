
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/graphql/schema.gql",
  documents: "src/**/*.tsx",
  generates: {
    "gql/": {
      preset: "client",
      documents: 'src/graphql/*.gql',
      plugins: ['typescript-react-apollo']
    }
  }
};

export default config;
