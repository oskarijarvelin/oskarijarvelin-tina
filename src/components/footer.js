import React from "react"
import { Wrapper } from "./style"
import styled from "styled-components"
import { transparentize } from "polished"

export const Footer = styled(({ ...styleProps }) => {
  return (
    <footer {...styleProps}>
      <Wrapper>
        © 2012 - {new Date().getFullYear()}:
        {` `}
        <a href="https://oskarijarvelin.fi">Oskari Järvelin</a>.
      </Wrapper>
    </footer>
  )
})`
  font-size: 0.7rem;
  line-height: 3rem;
  text-align: center;
  height: 3rem;
  background-color: ${props =>
    transparentize(0.97, props.theme.color.foreground)};
  box-shadow: inset 0 1px 0
    ${props => transparentize(0.95, props.theme.color.foreground)};

  a {
    font-family: 'Roboto Condensed';
    font-size: 0.8rem;
    font-weight: 700;
  }
`
