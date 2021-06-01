## Bug reproduction

### Working example - version 0.4.3

1. Checkout to branch master
2. Run `npm install`
3. Run `npm run build`

You will notice that `bundle-stats.json` contains all the entries specified in webpack configs - `entryA, entryB, main, notifications`

### Broken example - version 1.0.0

1. Checkout to branch broken
2. Run `npm install`
3. Run `npm run build`

You will notice that `bundle-stats.json` contains only one pair of entries from webpack configs - either `entryA, entryB` or `main, notifications`. 
Every time you run `npm build` it seems to randomly generate `bundle-stats.json` only for one pair. Notice that chunk are correctly generated in the `dist` directory.
