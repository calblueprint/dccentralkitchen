# Checkout Screen

## Cart (line items)

## Quantity Modal

## Rewards Modal

## Scrollbar

### Overview

The alphabetical scrollbar allows clerks to quickly navigate to different products with names within certain letters. For example, the "L-S" tab scrolls to the Lemon product card, which is the first product starting with a letter in the given range.

*Note*: The tab will always scroll to the first product card with a name starting with any letter in the letter range, provided that products are displayed in alphabetical order in the products container.

![checkoutscreen](../assets/clerk/checkoutscreen.jpeg)
#### Relevant files
`CheckoutScreen.js`

#### Original PR
[Clerk PR #20: alphabet scrollbar](https://github.com/calblueprint/dccentralkitchen-clerks/pull/20)

### Methods

`getIndexOfFirstProductAtLetter` returns the index of the first product that falls within the letter range corresponding to the tab selected. It takes in the first letter in the range, as a string.

The index is later used to calculate the row number the product card is in on the screen, given that there are five columns of products on the tablet screen.

```jsx
// Returns index of the first product with a name starting with the given letter in products list.
// If no product starting with that letter exists, find the next product.
getIndexOfFirstProductAtLetter = letter => {
  let prodList = this.state.products.filter(product => product.name.charAt(0) === letter);
  let nextLetter = letter;
  while (prodList.length === 0) {
    nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    prodList = this.state.products.filter(product => product.name.charAt(0) === nextLetter);
  }
  return this.state.products.indexOf(prodList[0]);
};
```

`alphabeticalScrollTab` takes in a letter range label and a letter, both strings, and returns a tab to be rendered in the scroll bar on the checkout screen.

The index of the product in the products list divided by 5 gives us the row number of the product on the screen. Since the height of each product card is roughly `160px`, the row number multiplied by 160 gives us the y-coordinate of the card in pixels.

```jsx
// Takes in strings tab label (i.e. "A-K") and starting letter (i.e. "A") and returns a
// tab for the bottom alphabetical scroll bar.
alphabeticalScrollTab = (label, letter) => {
  return (
    <TabContainer
      onPress={() =>
        this._scrollView.scrollTo({
          y: Math.floor(this.getIndexOfFirstProductAtLetter(letter) / 5) * 160
        })
      }>
      <Title>{label}</Title>
    </TabContainer>
  );
};
```

### Quickscroll Functionality in a ScrollView

We add a `ref` to an existing ScrollView that we want to scroll through.

```jsx
<ProductsContainer
  ref={scrollView => {
    this._scrollView = scrollView;
  }}>
```

Each tab calls the ref's `scrollTo` method to quickscroll to a different y coordinate.

*Note*: Using this same logic, it's also possible to scroll horizontally by providing an x coordinate. For our purposes, we only want to scroll up and down the products container.