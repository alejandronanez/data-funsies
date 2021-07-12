# Data Funsies

## The project, from a 30,000 foot view.
A POC web application built with Next.js used to understand what are the best selling authors from Amazon from 2009-2019 according to the [Amazon Top 50 Bestselling Books 2009-2019](https://www.kaggle.com/sootersaalu/amazon-top-50-bestselling-books-2009-2019) dataset from Kaggle.

## Product Overview
Instead of going straight to the Charts, I decided to create a brief marketing focused approach because I consider that charts only tell one part of the story. That said, I created:
1. A banner to help communicate the purpose of this POC
2. A `Did you know / interesting facts` section that highlights the most important parts of the site.

After this, I decided to introduce the Dynamic charts. There, I communicate 6 metrics that caught my attention:
- The 5 Authors with most reviews
- The 5 Authors with less reviews
- The 5 Authors with most earnings
- The 5 Authors with less earnings (There are 3 authors that got 0 from their best sellers!)
- The 5 Authors with most best sellers
- The 5 Authors with less best sellers

I also created a table to help to communicate the data that's on the Charts, I think that people will appreciate this as well.

## Technical Overview

### The dataflow

```text
static dataset -> data transforming functions -> Next.js getStaticProps -> Static Site
```

### The dataset
The POC doesn't get the dataset from any API, instead, it consumes a static file located in [/src/rawData/bestsellers.ts](https://github.com/alejandronanez/data-funsies/blob/e09e813c6b5a613dae99410882cc06990bba8ee9/src/rawData/bestsellers.ts). The reason for it to be a TypeScript file, and not a `.json` file is because that's the easiest way to know if some of the data is bad formatted / corrupted. It's easy to check this out with this line:

```typescript
import { BestSeller } from 'types/types';
export const bestSellers: BestSeller[] = [...];
```
[link to the code](https://github.com/alejandronanez/data-funsies/blob/e09e813c6b5a613dae99410882cc06990bba8ee9/src/rawData/bestsellers.ts#L1-L3)

It's worth nothing that this dataset is not a 1:1 match of [bestsellers.csv](https://github.com/alejandronanez/data-funsies/blob/e09e813c6b5a613dae99410882cc06990bba8ee9/src/rawData/bestsellers.csv), as I changed it's genre prop from `Non-Fiction` to `nonFiction` and `Fiction` to `fiction`. I found that it was easier to work with _JavaScript_ friendly keys, that's the only reason why I made that change.

### The data transformation layer
Almost, if not all, the _heavy_ logic happens on the files inside the [/src/dataProcessing](https://github.com/alejandronanez/data-funsies/tree/e09e813c6b5a613dae99410882cc06990bba8ee9/src/dataProcessing) folder. The idea behind this, was to delegate as much responsibility to the server as possible in order to free up the client to do any expensive computation. Right now it doesn't really matter as we're only processing 550 records, but the dataset could grow in orders of magnitude in the future, and that could seriously affect performance if we do all these computations clientside.  Another reason to delegate all this to the server is that the data transformation will only happen once (at build time), if we were to do this on the client, it will happen on every render!

I'm relying heavily on `Lodash` in order to make the transformations easier. I think that this is OK for now due to time constrains, plus, `Lodash` is a battle-tested library.

It's worth noting that the data transformation layer has two different _levels_, the first one, is the `data.ts` file, which gets (almost all) the transformed data from `transformers`, and then, it passes it to `Next.js`. The data flow looks like this:

```text
transformers ---> data ---> getStaticProps
```

This could look cumbersome, but, the idea behind it is to hide the implementation details of `Lodash` from the `data` module, so it's easier to change in the future. For instance, take:

```typescript
export const getPopularAuthorsByRevenue = ({
  books,
  limit = 5,
  order = 'DESC',
}: getAuthorsDataFnParams) => {
  const authorsByRevenew = getAuthorsByRevenue(books);
  return sortAndTake({
    collection: authorsByRevenew,
    order,
    keyToOrderBy: 'total',
    limit,
  });
};
```
[see file](https://github.com/alejandronanez/data-funsies/blob/main/src/dataProcessing/data.ts#L56-L68)

There it would be easier to change `getAuthorsByRevenue` in `transformers.ts` without affecting `getPopularAuthorsByRevenue` in `data.ts`. For instance, if we wanted to change `Lodash` with `Ramda` it will be transparent for `getPopularAuthorsByRevenue`.

### Getting data into Next.js

I decided to use Next.js `getStaticProps (SSG)` in order to delegate all the heavy data processing logic to the server and not to the client (see the _The data transformation layer_ section above for more detail on this). By using `getStaticProps` it would mean that the computation will only happen once, at build time.
I chose this option over `getServerSideProps (SSR)` because of a similar reason. I don't want to do those calculations on the server on every single request.

### The Client (or how React does the rest)

#### Styles
If you're curious, I'm using Tailwind to style the app.

#### React Components
The client doesn't have to do much at this point, as it receives all the data ready to be used/shown. One decision I made in order to minimize the work that React has to do on the client, was to pass down all the data needed in the `datasets` prop
- [datasets in getStaticProps](https://github.com/alejandronanez/data-funsies/blob/e09e813c6b5a613dae99410882cc06990bba8ee9/src/pages/index.tsx#L55-L117)
- [datasets props on the client](https://github.com/alejandronanez/data-funsies/blob/e09e813c6b5a613dae99410882cc06990bba8ee9/src/pages/index.tsx#L40)

With that, I can choose each one of the elements in `dataset` with [this logic](https://github.com/alejandronanez/data-funsies/blob/e09e813c6b5a613dae99410882cc06990bba8ee9/src/components/DynamicChart/DynamicChart.tsx#L22-L36).


## Challenges I faced
- Charting libraries are always complicated and have a steep learning curve.
- Reusing some methods was not always obvious.
- Make the chart responsive. Again, data visualization libraries are always complicated.

## Easy wins / Future improvements
### Create different pages to show even more data! For instance, take a look at this
![](https://cdn.zappy.app/ce562e080aa227466b3ffbc72b6718af.png)

There we could create three different routes that could expand on specific data:

- `/books/fiction` and `/books/non-fiction`
- `/authors/:authorName`
- `/books/:bookName`
### Add more filters
It will be possible to load more data instead of just datasets of 5 items. Then, do some light filtering on the frontend. That will give the users way more insight!

![](https://cdn.zappy.app/99d35e2d76a065d9d1122d8d70084590.png)

## Known issues
- We don't get the dataset from an API, so it could mean that we have stale data.
- The dataset is not a 1:1 match with the original `.csv` dataset.
- Some of the labels on the chart overlap. I tried to solve this by creating a table, I think it works fine, but it's not particularly great. I can see different solutions for this problem:
1. Trim the names if they exceed certain length.
2. Customize the component that takes care of rendering those labels.
3. Update the styles for the whole chart.
