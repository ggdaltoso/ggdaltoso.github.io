# gatsby-plugin-giscus

Gatsby plugin for Giscus integration, a comments system powered by GitHub Discussions.

## Installation

As a local plugin, no separate installation is needed. To use as an npm package in the future:

```bash
npm install gatsby-plugin-giscus
```

## Setup

### 1. GitHub Preparation

1. Make sure your repository is public
2. Enable GitHub Discussions in your repository
3. Install the [Giscus app](https://github.com/apps/giscus) on your repository
4. Visit https://giscus.app to generate your configuration

### 2. Add to gatsby-config.js

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-giscus',
      options: {
        repo: 'your-username/your-repo',
        repoId: 'your-repo-id',
        category: 'General',
        categoryId: 'your-category-id',
        mapping: 'pathname',
        reactionsEnabled: '1',
        theme: 'light',
        lang: 'en',
      },
    },
  ],
};
```

### 3. Use the component

```javascript
import { Giscus } from 'gatsby-plugin-giscus';

const Comments = () => {
  return <Giscus />;
};
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `repo` | string | **required** | GitHub repository in "owner/repo" format |
| `repoId` | string | **required** | Repository ID |
| `category` | string | **required** | Discussion category name |
| `categoryId` | string | **required** | Category ID |
| `mapping` | string | `'pathname'` | How to map pages to discussions |
| `strict` | string | `'0'` | Strict title matching |
| `reactionsEnabled` | string | `'1'` | Enable reactions |
| `emitMetadata` | string | `'0'` | Emit discussion metadata |
| `inputPosition` | string | `'bottom'` | Comment input position |
| `theme` | string | `'light'` | Giscus theme |
| `lang` | string | `'en'` | Language |
| `loading` | string | `'lazy'` | Loading mode |

## How to get the IDs

Visit https://giscus.app and follow these steps:

1. Enter your repository name
2. Select a discussion category
3. The IDs will be generated automatically
4. Copy the values to your configuration

## Export as npm package

To publish this plugin as a separate npm package:

1. Move the `plugins/gatsby-plugin-giscus` folder to a new repository
2. Update `package.json` with repository information
3. Create tests
4. Publish to npm: `npm publish`

## License

MIT
