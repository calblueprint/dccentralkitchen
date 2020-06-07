<!-- Embedded with the <Content/> Vue component into Customer/Clerk sections -->

::: warning NOTE
This documentation is the same for both the customer and clerk applications.
:::

In both the clerk and customer app, we use `FontAwesome5` from `@expo/vector-icons`.

You can browse all of the icons in the [@expo/vector-icons directory](https://icons.expo.fyi/), and filter by **FontAwesome5**.

## Example Usage
```jsx
// Source: CenterLocation.js
import { FontAwesome5 } from '@expo/vector-icons';
...
<FontAwesome5
    name="location-arrow"
    solid
    size={20}
    color={Colors.primaryGreen}
/>
```

See the [Expo Icons docs](https://docs.expo.io/guides/icons/#expovector-icons) for more on icons in Expo.