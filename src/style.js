import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
  font-size: 1rem;
  h3 {
    margin: 1rem 0;
  }
`;

export const Card = styled(Link)`
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: center;
  width: auto;
  height: 25vh;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    margin: 0 1rem;
    bottom: 10%;
    color: white;
  }
  // @media (max-width: 846px) {
  //   height: 15vh;
  // }
  // @media (max-width: 600px) {
  //   height: 10vh;
  // }
`;

export const Shadow = styled.div`
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export const List = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;

export const CLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: #1f1f1f;
  background: linear-gradient(#868686, #1f1f1f);
  width: 3rem;
  height: 3rem;
  color: white;
  border-radius: 50%;
  p {
    font-size: 0.6rem;
  }
  svg {
    font-size: 1rem;
  }
  &.active {
    background: linear-gradient(#d66e66, #b21024);
  }
`;

export const Grid = styled(motion.div)`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin: 2rem 0;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  margin-bottom: 1rem;
  div {
    position: relative;
    width: 40%;
    text-align: center;
  }
  input {
    width: 100%;
    font-size: 1rem;
    padding: 0.8rem 2.5rem;
    background: linear-gradient(#868686, #1f1f1f);
    color: white;
    border-style: none;
    border-radius: 2rem;
    letter-spacing: 0.1rem;
    font-weight: 600;
    outline: none;
  }
  svg {
    position: absolute;
    left: 1rem;
    top: 32%;
    font-size: 1rem;
    color: white;
  }
  @media (max-width: 950px) {
    div {
      width: 300px;
    }
  }
`;

export const RWrapper = styled(motion.div)`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 2rem 0;
  img {
    margin: 1rem 0;
    width: 40rem;
    height: auto;
  }
  @media (max-width: 1150px) {
    flex-direction: column;
    gap: 0;
    align-items: center;
    img {
      width: 100%;
    }
  }
`;

export const Info = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  ul {
    list-style: none;
  }
  ol {
    margin-left: 1rem;
  }
  .active {
    background: linear-gradient(#454545, #1f1f1f);
    color: white;
  }
  @media (max-width: 1150px) {
    margin-top: 0;
    width: 34.75rem;
  }
  @media (max-width: 710px) {
    width: auto;
    .container {
      width: 78.7vw;
    }
  }
`;

export const Button = styled.button`
  display: inline;
  padding: 0.5rem 0;
  margin-right: 1.25rem;
  width: 6rem;
  background-color: white;
  color: #1f1f1f;
  font-weight: 600;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 6.5rem;
    margin-right: 1rem;
  }
`;

export const Name = styled(Link)`
  font-family: 'Pacifico', cursive;
  font-size: 2rem;
  margin: 0;
  text-decoration: none;
  color: #1f1f1f;
`;

export const Table = styled.table`
  th,
  td {
    padding-right: 1.5rem;
  }
  td:nth-child(2),
  td:nth-child(3) {
    text-align: center;
  }
`;
