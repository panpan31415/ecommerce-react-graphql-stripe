import React from "react";
import { Box, Text, Heading, Image } from "gestalt";
import { NavLink } from "react-router-dom";
const Navbar = () => (
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

export default Navbar;
