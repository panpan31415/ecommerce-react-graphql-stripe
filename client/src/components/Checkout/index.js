import React from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  TextField,
  Modal,
  Spinner, Button
} from "gestalt";
import ToastMessage from "../ToastMessage";
import { getCart, calculatePrice } from "../../utils";


const ConfirmationModal = ({ orderProcessing, cartItems, closeModal, handleSubmitOrder }) => (
  <Modal
    accessibilityCloseLabel="close"
    accessibilityModalLabel="Confirm Your Order"
    heading="Confirm Your Order"
    onDismiss={closeModal}
    footer={
      <Box
        display="flex"
        marginRight={-1}
        marginLeft={-1}
        justifyContent="center">
        <Box padding={1}>
          <Button
            size="lg"
            color="red"
            text="Submit"
            disabled={orderProcessing}
            onClick={handleSubmitOrder} />
        </Box>
        <Box padding={1}>
          <Button
            size="lg"
            color="red"
            text="Cancel"
            disabled={orderProcessing}
            onClick={closeModal} />
        </Box>
      </Box>}
    role="alertdialog"
    size="sm"
  >
    {/* order summary */}
    {!orderProcessing && (<Box display="flex" justifyContent="center" alignItems="center" direction="column" padding={1} color="lightWash">
      {cartItems.map(item => <Box key={item._id} padding={1}>
        <Text size="lg" color="red" color="red">
          {item.name} x {item.quantity} - ${item.quantity * item.price}
        </Text>
      </Box>)}
      <Box paddingY={2}>
        <Text size="lg" bold>Total:{calculatePrice(cartItems)}</Text>
      </Box>
    </Box>)}


    {/* order processing spinners */}
    <Spinner show={orderProcessing} accessibilityLabel="Order Processing Spinner" />
    {orderProcessing && <Text align="center">Submitting Order...</Text>}

  </Modal>)


class Checkout extends React.Component {


  state = {
    toast: "",
    address: "",
    postalCode: 0,
    city: "",
    confirmationEmail: "",
    cartItems: [],
    orderProcessing: false,
    modal: false
  }


  componentDidMount() {
    this.setState({
      cartItems: getCart()
    });
  }


  handleChange = ({ event, value }) => {
    this.setState({
      [event.target.name]: value,
    });
  };
  isFormEmpty = ({ address, city, postalCode, confirmationEmail }) => {
    return !address || !city || !postalCode || !confirmationEmail
  };


  handleConfirmOrder = async event => {
    event.preventDefault();
    const { address, city, postalCode, confirmationEmail } = this.state;
    if (this.isFormEmpty(this.state)) {
      this.showToast("Fill in all fields");
      return;
    }

    this.setState({
      modal: true
    });


    // login user

    // try {
    //   this.setState({ loading: true });
    //   const response = await strapi.login(username, password);
    //   this.setState({ loading: false });
    //   setToken(response.jwt);
    //   this.props.history.push("/");
    // } catch (error) {
    //   this.setState({ loading: false });
    //   this.showToast(error.statusCode);
    // }
  };

  handleSubmitOrder = () => {

  }

  closeModal = () => {

    this.setState({
      modal: false
    });




  }


  showToast = msg => {
    this.setState({
      toast: msg,
    });
    setTimeout(() => {
      this.setState({ toast: "" });
    }, 5000);
  };

  render() {

    return <Container>
      <Box
        color="darkWash"
        margin={4}
        padding={4}
        shape={"rounded"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        {/* heading */}
        <Heading color="midnight">Checkout</Heading>
        {
          this.state.cartItems.length > 0 ? <React.Fragment> {/* cart items */}
            <Text color="darkGray" italic> {this.state.cartItems.length} items for checkout </Text>
            <Box padding={2}> {this.state.cartItems.map(item => <Box key={item._id} padding={1}>
              <Text color="midnight">{item.name} x {item.quantity} - ${item.quantity * item.price}</Text>
            </Box>)}</Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              direction="column"
              marginTop={2}
              marginBottom={6}
            >  <Text>Total Amount: {calculatePrice(this.state.cartItems)}</Text></Box>




            {/* checkout Form */}
            <form
              style={{
                display: "inlineBlock",
                textAlign: "center",
                maxWidth: 450,
              }}
              onSubmit={this.handleConfirmOrder}
            >
              {/* checkout form header */}





              {/* Shipping Address */}
              <TextField
                id="address"
                type="text"
                name="address"
                placeholder="Shipping Address"
                onChange={this.handleChange}
                value={this.state.address}
              />
              <TextField
                id="postalCode"
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                onChange={this.handleChange}

              />
              <TextField
                id="city"
                type="text"
                name="city"
                placeholder="City of Residence"
                onChange={this.handleChange}
                value={this.state.city}
              />
              <TextField
                id="confirmationEmail"
                type="email"
                name="confirmationEmail"
                placeholder="Confirmation Email"
                onChange={this.handleChange}

              />
              <button id="stripe__button" type="submit">Submit</button>
            </form></React.Fragment> : <React.Fragment>
              <Box color="darkWash" shape="rounded" padding={4}>
                <Heading align="center" color="watermelon" size="xs"> Your cart is empty</Heading>
                <Text align="center" italic color="green">Add some brews!</Text>
              </Box>
            </React.Fragment>
        }


      </Box>


      {this.state.modal && <ConfirmationModal
        orderProcessing={this.state.orderProcessing}
        cartItems={this.state.cartItems}
        closeModal={this.closeModal}
        handleSubmitOrder={this.handleSubmitOrder}
      />}
      <ToastMessage msg={this.state.toast || ""} />
    </Container>
      ;
  }
}




export default Checkout;
