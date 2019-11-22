import React from "react";
import { Container, Box, Button, Heading, Text, TextField } from "gestalt";
import ToastMessage from "../ToastMessage";
import Strapi from "strapi-sdk-javascript/build/main";
import { setToken } from "../../utils";
const apiUrl = process.env.API_URL || "http://localhost:1337/";
const strapi = new Strapi(apiUrl);

class SignUp extends React.Component {
  state = {
    username: "",
    email: "",
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
    const { username, email, password } = this.state;
    if (this.isFormEmpty(this.state)) {
      this.showToast("Fill in all fields");
      return;
    }

    // signup user

    try {
      this.setState({ loading: true });
      const response = await strapi.register(username, email, password);
      this.setState({ loading: false });
      console.log(response);
      setToken(response.jwt);
      this.props.history.push("/");
    } catch (error) {
      console.log(JSON.stringify({ ...error.message }));
      this.setState({ loading: false });
      this.showToast(error.statusCode);
    }
  };
  redirectUser = path => this.props.history.push(path);
  isFormEmpty = ({ username, email, password }) => {
    return !username || !email || !password;
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
              backgroundColor: "#ebe2da",
            },
          }}
          margin={4}
          padding={4}
          shape={"rounded"}
          display="flex"
          justifyContent="center"
        >
          {/* sign up Form */}

          <form
            style={{
              display: "inlineBlock",
              textAlign: "center",
              maxWidth: 450,
            }}
            onSubmit={this.handleSubmit}
          >
            {/* sign up form header */}

            <Box
              marginBottom={2}
              display="flex"
              direction="column"
              alignItems="center"
            >
              <Heading color="midnight">Let's get started</Heading>
            </Box>
            <Text italic color="orchid">
              Sign up to order some brews
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
              id="email"
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={this.handleChange}
              value={this.state.email}
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

export default SignUp;
