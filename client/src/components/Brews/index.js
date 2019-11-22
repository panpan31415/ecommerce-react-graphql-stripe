import React from "react";
import Strapi from "strapi-sdk-javascript/build/main";
import {
  Box,
  Heading,
  Text,
  Image,
  Card,
  Button,
  Mask,
  IconButton,
} from "gestalt";
import { Link } from "react-router-dom";
import { calculatePrice, setCart, getCart } from "../../utils";

const apiUrl = process.env.API_URL || "http://localhost:1337/";
const strapi = new Strapi(apiUrl);
class Brews extends React.Component {
  state = {
    brews: [],
    brand: "",
    cartItems: [],
  };

  async componentDidMount() {
    try {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `query {
            brand(id:"${this.props.match.params.brandId}")
            {_id,name,description,images{url},brews{_id,name,description,price,image{url}}}
          }`,
        },
      });

      this.setState({
        brand: response.data.brand.name,
        brews: response.data.brand.brews,
        cartItems: getCart(),
      });
    } catch (e) {
      console.log(e);
    }
  }

  addToCart = brew => {
    const alreadyInCart = this.state.cartItems.findIndex(
      item => item._id === brew._id,
    );

    if (alreadyInCart === -1) {
      const updatedItems = this.state.cartItems.concat({
        ...brew,
        quantity: 1,
      });
      this.setState({ cartItems: updatedItems });
    } else {
      const updatedItems = [...this.state.cartItems];
      updatedItems[alreadyInCart].quantity += 1;
      this.setState(
        {
          cartItems: updatedItems,
        },
        () => setCart(updatedItems),
      );
    }
  };

  deleteItemFromCart = id => {
    const filteredItems = this.state.cartItems.filter(item => item._id !== id);
    this.setState(
      {
        cartItems: filteredItems,
      },
      setCart(filteredItems),
    );
  };

  render() {
    const { brand, brews, cartItems } = this.state;
    return (
      <Box
        marginTop={4}
        display="flex"
        justifyContent="center"
        alignItems="start"
        dangerouslySetInlineStyle={{
          __style: {
            flexWrap: "wrap",
          },
        }}
      >
        {/* Brews Section */}
        <Box display="flex" direction="column" alignItems="center">
          {/* brews heading */}
          <Box margin={2}>
            <Heading color="orchid">{brand} </Heading>
          </Box>
          {/* brews  */}
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: "#bccdd9",
              },
            }}
            shape="rounded"
            display="flex"
            justifyContent="center"
            padding={4}
            wrap
          >
            {brews.map(brew => (
              <Box padding={4} key={brew._id} margin={2} width={300}>
                <Card
                  image={
                    <Box height={200} width={250}>
                      <Image
                        fit="cover"
                        naturalHeight={1}
                        naturalWidth={1}
                        key={brew.image._id}
                        src={`${apiUrl}${brew.image.url}`}
                        alt="product img"
                      />
                    </Box>
                  }
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                  >
                    <Box marginBottom={2}>
                      <Text bold size="xl">
                        {brew.name}
                      </Text>
                    </Box>
                    <Text>{brew.description}</Text>
                    <Text>${brew.price}</Text>
                    <Box marginTop={2}>
                      <Text bold>
                        <Button
                          color="blue"
                          text="add to cart"
                          onClick={() => this.addToCart(brew)}
                        />
                      </Text>
                    </Box>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
        {/* Users Cart */}
        <Box marginTop={2} marginLeft={8}>
          <Mask shape="rounded" wash>
            <Box
              display="flex"
              direction="column"
              alignItems="center"
              padding={2}
            >
              {/* User cart heading */}
              <Heading align="center" size="sm">
                Your Cart
              </Heading>
              <Text color="gray" italic>
                {cartItems.length} items in cart
              </Text>
              {/* cart items */}
              {cartItems.map(item => (
                <Box key={item._id} display="flex" alignItems="center">
                  <Text>
                    {item.name} x {item.quantity} - $
                    {(item.quantity * item.price).toFixed(2)}
                  </Text>
                  <IconButton
                    accessibilityLabel="Delete Item"
                    icon="cancel"
                    size="sm"
                    iconColor="red"
                    onClick={() => this.deleteItemFromCart(item._id)}
                  />
                </Box>
              ))}

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                direction="column"
              >
                <Box margin={2}>
                  {cartItems.length === 0 && (
                    <Text color="red">Please select some items</Text>
                  )}
                </Box>
                <Text size="lg">Total: {calculatePrice(cartItems)}</Text>
                <Text>
                  <Link to="/checkout">checkout</Link>
                </Text>
              </Box>
            </Box>
          </Mask>
        </Box>
      </Box>
    );
  }
}
export default Brews;
