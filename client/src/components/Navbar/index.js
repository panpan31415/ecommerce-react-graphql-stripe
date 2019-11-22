import React from "react";
import { Box, Text, Heading, Image, Button } from "gestalt";
import { NavLink, withRouter } from "react-router-dom";
import { getToken, removeToken, clearCart } from "../../utils";

class Navbar extends React.Component {
  handleSignOut = () => {
    removeToken();
    clearCart();
    this.props.history.push("/");
  };

  render() {
    return getToken() !== null ? (
      <AuthNav handleSignOut={this.handleSignOut} />
    ) : (
      <UnAuthNav />
    );
  }
}

const AuthNav = ({ handleSignOut }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    padding={1}
    shape={"roundedBottom"}
    color="midnight"
  >
    <NavLink to="/checkout" exact activeClassName="active">
      <Text size="xl" color="white">
        Checkout
      </Text>
    </NavLink>

    <NavLink to="/" exact activeClassName="active">
      <Box display="flex" alignItems="center">
        <Box height={50} width={50} margin={2}>
          <Image
            alt="BrewHaha Logo"
            src="./../icons/logo.svg"
            naturalWidth={1}
            naturalHeight={1}
          />
        </Box>
        <Heading size="xs" color="orange">
          BrewHaha
        </Heading>
      </Box>
    </NavLink>

    <Button
      inline
      text="Sign Out"
      color="transparent"
      size="md"
      onClick={handleSignOut}
    />
  </Box>
);

const UnAuthNav = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    padding={1}
    shape={"roundedBottom"}
    color="midnight"
  >
    <NavLink to="/signin" exact activeClassName="active">
      <Text size="xl" color="white">
        Sign In
      </Text>
    </NavLink>

    <NavLink to="/" exact activeClassName="active">
      <Box display="flex" alignItems="center">
        <Box height={50} width={50} margin={2}>
          <Image
            alt="BrewHaha Logo"
            src="./../icons/logo.svg"
            naturalWidth={1}
            naturalHeight={1}
          />
        </Box>
        <Heading size="xs" color="orange">
          BrewHaha
        </Heading>
      </Box>
    </NavLink>

    <NavLink to="/signup" exact activeClassName="active">
      <Text size="xl" color="white">
        Sign Up
      </Text>
    </NavLink>
  </Box>
);

export default withRouter(Navbar);
