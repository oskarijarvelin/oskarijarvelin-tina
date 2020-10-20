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
      {({ toggleDarkMode, isDarkMode }) => (
        <header {...styleProps}>
          <HeaderWrapper className={ siteTitle === ' Blogi' ? 'wide' : ''}>
            <SiteTitle>
              <SiteLink to="/">
                {siteTitle}
              </SiteLink>
            </SiteTitle>
            <Nav toggleDarkMode={toggleDarkMode} isdarkmode={isDarkMode} />
            <DarkModeToggle
              aria-label="Toggle Dark Theme"
              onClick={toggleDarkMode}
              isdarkmode={isDarkMode.toString()}
            />
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
`

export const SiteTitle = styled.h1`
  margin: 0;
  flex: 1 0 auto;
  font-family: 'Roboto Condensed';
  font-size: 1.35rem;
  font-weight: 700;
  align-self: stretch;
  display: flex;
  order: 1;

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    font-size: 1.15rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.medium}) {
    font-size: 1.35rem;
  }
`

export const HeaderWrapper = styled(Wrapper)`
  align-items: center;
  align-self: stretch;
  display: flex;
  height: 100%;
  justify-content: space-between;
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
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  opacity: 0.7;
  order: 2;
  overflow: hidden;
  transition: all 300ms ${props => props.theme.easing};
  transform-origin: 50% 50%;

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    margin-left: 1rem;
    order: 3;
  }

  svg {
    position: absolute;
    top: calc(50% - 1rem);
    left: calc(50% - 1rem);
    width: 2rem;
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

    @media (min-width: ${props => props.theme.breakpoints.small}) {
      top: calc(50% - .75rem);
      left: calc(50% - .75rem);
      width: 1.5rem;
    }
  }

  &:focus,
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