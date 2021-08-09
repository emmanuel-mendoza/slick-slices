import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzasStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const PizzaStyled = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

function Pizza({ pizza }) {
  return (
    <PizzaStyled>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((t) => t.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </PizzaStyled>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <PizzasStyled>
      {pizzas.map((pizza) => (
        <Pizza pizza={pizza} key={pizza.id} />
      ))}
    </PizzasStyled>
  );
}
