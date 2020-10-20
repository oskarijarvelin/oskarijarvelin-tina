import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { css } from "styled-components"
import { mix, transparentize } from "polished"
import { Link } from "gatsby"

export const Nav = ({ toggleDarkMode, isDarkMode }) => {
  const data = useStaticQuery(graphql`
    query navQuery {
      settingsJson(fileRelativePath: { eq: "/content/settings/menu.json" }) {
        ...nav
      }
    }
  `)

  const [navopen, setnavopen] = useState(false)
  const togglenavopen = () => {
    setnavopen(!navopen)
  }

  const menu = data.settingsJson

  return (
    <>
      <NavToggle
        aria-label="Avaa valikko"   
        onClick={togglenavopen}
        navopen={navopen.toString()}
      ></NavToggle>
      <StyledNavbar navopen={navopen.toString()} isdarkmode={isDarkMode}>
        {menu.menuItems.map(item => (
          <NavItem key={item.label}>
            <NavLink
              onClick={togglenavopen}
              partiallyActive={item.link === "/" ? false : true}
              to={item.link}
            >
              {item.label}
            </NavLink>
          </NavItem>
        ))}
      </StyledNavbar>
    </>
  )
}

export const StyledNavbar = styled.ul`
  color: inherit;
  order: 3;

  @media (max-width: ${props => props.theme.breakpoints.small}) {
    align-items: stretch;
    background-color: ${props => 
      props.isDarkMode || props.theme.header.transparent
        ? mix(0.95, props.theme.color.black, props.theme.color.white)
        : mix(0.95, props.theme.color.white, props.theme.color.black)};
    bottom: 0;
    box-shadow: 0 1rem 2rem -0.5rem ${props => transparentize(0.5, props.theme.color.black)};
    display: none;
    flex-direction: column;
    left: 0;
    padding: 2rem 0;
    position: absolute;
    transform: translate3d(0, 100%, 0);
    transition: all 150ms ${p => p.theme.easing};
    width: 100%;
    z-index: 1000;
    
    ${props =>
      props.navopen === 'true' &&
      css`
        display: flex;
      `};
  }

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    display: flex;
    flex-direction: row;
    align-self: stretch;
    align-items: stretch;
    justify-content: flex-end;
    flex: 1 0 auto;
    margin: 0;
    opacity: 1;
    padding: 0;
    pointer-events: all;
    order: 2;
  }
`

export const MenuItem = {
  name: "menuItem",
  key: "label",
  label: "Menu Item",
  component: "group",
  fields: [
    { name: "label", label: "Label", component: "text" },
    { name: "link", label: "Path", component: "text" },
  ],
}

export const MenuForm = {
  label: "Menu",
  fields: [
    {
      label: "Menu Items",
      name: "rawJson.menuItems",
      component: "blocks",
      templates: {
        MenuItem,
      },
    },
  ],
}

export const NavItem = styled.li`
  flex: 0 0 auto;
  display: flex;
  align-items: stretch;
  color: inherit;
`

export const NavLink = styled(({ children, ...styleProps }) => (
  <Link activeClassName="active" {...styleProps} iscurrent="true">
    <span>{children}</span>
  </Link>
))`
  align-items: center;
  color: inherit !important;
  display: flex;
  flex: 1 0 auto;
  font-size: 1rem;
  letter-spacing: 0.5px;
  line-height: ${props => props.theme.header.height};
  opacity: 0.5;
  overflow: visible;
  padding: 0 0.75rem;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all .3s ${p => p.theme.easing};
  z-index: 1;

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    padding: 0 0.5rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.medium}) {
    padding: 0 0.75rem;
  }

  &:focus-visible {
    opacity: 1;
  }

  &:hover {
    opacity: 1;
  }

  &.active {
    opacity: 1;
  }

  span {
    display: block;
    width: 100%;
  }

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    border-bottom: 4px solid transparent;
    border-top: 4px solid transparent;
    line-height: 1;
    opacity: 0.7;

    &:focus-visible {
      opacity: 1;
    }
  
    &:hover {
      border-bottom: 4px solid rgba(34, 51, 136, .5);
      opacity: 1;
    }

    &.active {
      border-bottom: 4px solid ${props => props.theme.color.primary};
      opacity: 1;
    }
  }
`

export const NavToggle = styled(({ menuPpen, ...styleProps }) => {
  return (
    <button {...styleProps}>
      <span className="menuBar"></span>
      <span className="menuBar menuBar2"></span>
    </button>
  )
})`
  position: relative;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  margin-left: 1rem;
  font-size: 0.8rem;
  line-height: 1;
  align-self: stretch;
  text-transform: uppercase;
  color: inherit;
  opacity: 0.5;
  overflow: visible;
  transition: all 150ms ${p => p.theme.easing};
  order: 4;
  width: 32px;

  svg {
    width: 2.5rem;
    height: auto;
  }

  .menuBar {
    background-color: ${props => props.theme.color.white};
    border-radius: 3px;
    height: 3px;
    right: 0;
    position: absolute;
    top: calc(50% - 8px);
    transition: all .3s ease-in-out;
    width: 28px;
  }

  .menuBar2 {
    top: calc(50% + 2px);
    width: 20px;
  }

  &:focus {
    opacity: 1;
    text-decoration: underline;
  }

  &:hover {
    opacity: 1;
  }

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    display: none;
  }

  ${props =>
    props.navopen === 'true' &&
    css`
      .menuBar {
        top: calc(50% - 3px);
        transform: rotate(45deg);
      }
    
      .menuBar2 {
        transform: rotate(-45deg);
        width: 28px;
      }
    `};
`

export const navFragment = graphql`
  fragment nav on SettingsJson {
    menuItems {
      link
      label
    }
  }
`

export const NavForm = {
  label: "Menu",
  fields: [
    {
      label: "Main Menu",
      name: "rawJson.menuItems",
      component: "group-list",
      itemProps: item => ({
        label: item.label,
      }),
      fields: [
        {
          label: "Label",
          name: "label",
          component: "text",
          parse(value) {
            return value || ""
          },
        },
        {
          label: "Link",
          name: "link",
          component: "text",
          parse(value) {
            return value || ""
          },
        },
        {
          label: "Sub Menu",
          name: "subMenu",
          component: "group-list",
          itemProps: item => ({
            key: item.link,
            label: item.label,
          }),
          fields: [
            {
              label: "Label",
              name: "label",
              component: "text",
            },
            {
              label: "Link",
              name: "link",
              component: "text",
            },
            {
              label: "Sub Menu",
              name: "subMenu",
              component: "group-list",
              itemProps: item => ({
                key: item.link,
                label: item.label,
              }),
              fields: [
                {
                  label: "Label",
                  name: "label",
                  component: "text",
                },
                {
                  label: "Link",
                  name: "link",
                  component: "text",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
