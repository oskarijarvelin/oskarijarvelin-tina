import React from "react"
import { Wrapper } from "./style"
import styled, { css } from "styled-components"
import { Moon, Sun } from "styled-icons/boxicons-regular"
import { transparentize } from "polished"
import { Nav } from "./nav"
import { ThemeContext } from "./theme"
import { Link } from "gatsby"

export const Header = styled(({ siteTitle, ...styleProps }) => {
  return (
    <ThemeContext.Consumer>
      {({ toggleDarkMode, isDarkMode, theme }) => (
        <header {...styleProps}>
          <HeaderWrapper>
            <SiteTitle>
              <SiteLink to="/">
                {siteTitle}
              </SiteLink>
            </SiteTitle>
            <DarkModeToggle
              aria-label="Toggle Dark Theme"
              onClick={toggleDarkMode}
              isDarkMode={isDarkMode}
            />
            <Nav toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
          </HeaderWrapper>
        </header>
      )}
    </ThemeContext.Consumer>
  )
})`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: ${props => props.theme.header.height};
  top: 0;
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.foreground};

  ${props =>
    props.theme.header.overline &&
    css`
      border-top: 6px solid ${props => props.theme.color.primary};
    `};

  ${props =>
    props.theme.header.underline &&
    css`
      box-shadow: inset 0 -1px 0 ${props => transparentize(0.9, props.theme.color.white)},
        0 1px 0 ${props => transparentize(0.9, props.theme.color.black)};
    `};

  ${props =>
    props.theme.header.transparent &&
    css`
      background-color: ${props =>
        transparentize(0.9, props.theme.color.black)};
      color: ${props => props.theme.color.white};
    `};
`

export const SiteLink = styled(Link)`
  position: relative;
  line-height: 3rem;
  display: flex;
  align-items: center;
  align-self: stretch;
  color: inherit !important;
  text-decoration: none;
  margin: 0;
  transition: all 150ms ${p => p.theme.easing};
  z-index: 1;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
    fill: currentColor;
  }
  &:after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: -1rem;
    width: calc(100% + 2rem);
    height: 100%;
    background-color: ${props => props.theme.color.primary};
    opacity: 0;
    transition: all 150ms ${p => p.theme.easing};
    z-index: -1;
  }

  &:focus-visible {
    &:after {
      opacity: 0.5;
    }
  }
`

export const SiteTitle = styled.h1`
  margin: 0;
  flex: 1 0 auto;
  font-family: 'Roboto Condensed';
  font-size: 1rem;
  font-weight: 700;
  align-self: stretch;
  display: flex;
  order: 1;
`

export const HeaderWrapper = styled(Wrapper)`
  display: flex;
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

export const DarkModeToggle = styled(({ ...styleProps }) => {
  return (
    <button {...styleProps}>
      <Sun />
      <Moon />
    </button>
  )
})`
  position: relative;
  width: 1.5rem;
  height: 2.75rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  opacity: 0.5;
  order: 2;
  overflow: hidden;
  transition: all 300ms ${props => props.theme.easing};
  transform-origin: 50% 50%;

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    width: 1.5rem;
    height: 100%;
    margin-left: 1rem;
    order: 3;
  }

  svg {
    position: absolute;
    top: calc(50% - 0.75rem);
    left: calc(50% - 0.75rem);
    width: 1.5rem;
    height: auto;
    fill: currentColor;
    transition: all 150ms ${props => props.theme.easing};
    transform-origin: 50% 50%;
    &:first-child {
      opacity: 0;
      transform: rotate(-90deg);
    }
    &:last-child {
      opacity: 1;
      transform: rotate(0deg);
    }
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    transform: rotate(360deg);
    opacity: 1;
  }

  &:hover {
    opacity: 1;
  }

  ${props =>
    props.theme.isDarkMode &&
    css`
      svg {
        &:first-child {
          opacity: 1;
          transform: rotate(0deg);
        }
        &:last-child {
          opacity: 0;
          transform: rotate(90deg);
        }
      }
    `};
`