import React, { Component } from "react";
import "./style.css";
import {
  Container,
  Box,
  Heading,
  Card,
  Image,
  Text,
  SearchField,
  Icon,
} from "gestalt";
import Strapi from "strapi-sdk-javascript/build/main";
import { Link } from "react-router-dom";
import Loader from "../Loader";
const apiUrl = process.env.API_URL || "http://localhost:1337/";
const strapi = new Strapi(apiUrl);

class App extends Component {
  state = {
    brands: [],
    searchTerm: "",
    loadingBrands: true,
  };

  async componentDidMount() {
    try {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `query {
          brands {_id,name,description,images{_id,name,url}}
         }`,
        },
      });
      this.setState({
        brands: response.data.brands,
        loadingBrands: false,
      });
    } catch (e) {
      console.log(e);
      this.setState({ loadingBrands: false });
    }
  }

  handleSearchChange = event => {
    this.setState({
      searchTerm: event.value,
    });
  };

  filteredBrands = ({ searchTerm, brands }) => {
    return brands.filter(brand =>
      (brand.description + " " + brand.name)
        .toUpperCase()
        .includes(searchTerm.toUpperCase()),
    );
  };

  render() {
    const { searchTerm, loadingBrands } = this.state;
    return (
      <Container>
        {/* search */}
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField
            id="searchField"
            accessibilityLabel="Brands Search Filed"
            onChange={this.handleSearchChange}
            placeholder="Search Brands"
            value={searchTerm}
          />
          <Box margin={2}>
            <Icon
              icon="filter"
              color={`${searchTerm ? "orange" : "gray"}`}
              size={20}
              accessibilityLabel="filter icon"
            />
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" marginBottom={2}>
          <Heading color="midnight" size="md">
            Brew Brands
          </Heading>
        </Box>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#d6c8ec",
            },
          }}
          shape="rounded"
          display="flex"
          justifyContent="around"
          wrap
        >
          <Loader show={loadingBrands} />
          {this.filteredBrands(this.state).map(b => (
            <Box padding={4} key={b._id} margin={2} width={200}>
              <Card
                image={
                  <Box height={200} width={200}>
                    {b.images.map(img => (
                      <Image
                        fit="cover"
                        naturalHeight={1}
                        naturalWidth={1}
                        key={img._id}
                        src={`${apiUrl}${img.url}`}
                        alt="product img"
                      />
                    ))}
                  </Box>
                }
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Text bold size="xl">
                    {b.name}
                  </Text>
                  <Text>{b.description}</Text>
                  <Text bold>
                    <Link to={`/${b._id}`}>See Brews</Link>
                  </Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    );
  }
}

export default App;
