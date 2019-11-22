import React from "react";
import { Container, Box, Button, Heading, Text, TextField } from "gestalt";
import ToastMessage from "../ToastMessage";
import Strapi from "strapi-sdk-javascript/build/main";
import { setToken } from "../../utils";
const apiUrl = process.env.API_URL || "http://localhost:1337/";
const strapi = new Strapi(apiUrl);

class SignIn extends React.Component {
  state = {
    username: "",
    password: "",
    toast: "",
    loading: false,
  };
  handleChange = ({ event, value }) => {
    this.setState({
      [event.target.name]: value,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    if (this.isFormEmpty(this.state)) {
      this.showToast("Fill in all fields");
      return;
    }

    // login user

    try {
      this.setState({ loading: true });
      const response = await strapi.login(username, password);
      this.setState({ loading: false });
      setToken(response.jwt);
      this.props.history.push("/");
    } catch (error) {
      this.setState({ loading: false });
      this.showToast(error.statusCode);
    }
  };
  redirectUser = path => this.props.history.push(path);
  isFormEmpty = ({ username, password }) => {
    return !username || !password;
  };

  showToast = msg => {
    this.setState({
      toast: msg,
    });
    setTimeout(() => {
      this.setState({ toast: "" });
    }, 5000);
  };

  render() {
    return (
      <Container>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#d6a3b1",
            },
          }}
          margin={4}
          padding={4}
          shape={"rounded"}
          display="flex"
          justifyContent="center"
        >
          {/* sign in Form */}

          <form
            style={{
              display: "inlineBlock",
              textAlign: "center",
              maxWidth: 450,
            }}
            onSubmit={this.handleSubmit}
          >
            {/* sign in form header */}

            <Box
              marginBottom={2}
              display="flex"
              direction="column"
              alignItems="center"
            >
              <Heading color="midnight">Let's get started</Heading>
            </Box>
            <Text italic color="orchid">
              Welcome back
            </Text>
            {/* user inputs */}
            <TextField
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
              value={this.state.username}
            />

            <TextField
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <Button
              inline
              color="blue"
              text="submit"
              type="submit"
              disabled={this.state.loading}
            />
          </form>
        </Box>
        <ToastMessage msg={this.state.toast || ""} />
      </Container>
    );
  }
}

export default SignIn;
