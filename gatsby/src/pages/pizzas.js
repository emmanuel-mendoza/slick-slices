import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data, pageContext }) {
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas with ${pageContext.topping}`
            : 'All Pizzas'
        }
      />
      <ToppingsFilter />
      <PizzaList pizzas={data.pizzas.nodes} />
    </>
  );
}

export const query = graphql`
  query PizzaQuery($topping: [String]) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
      nodes {
        id
        name
        price
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
