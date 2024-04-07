import styled from "styled-components";
import { createPortal } from "react-dom";
import { createContext, useEffect, useState, useContext } from "react";

const Menu = styled.div`
  display: flex;
  align-items: center;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => !["position"].includes(prop),
})`
  position: absolute;
  background-color: var(--color-grey-100);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props?.position?.x}px;
  top: ${(props) => props?.position?.y}px;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

const Menus = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({});

  useEffect(() => {
    const handleMenuPos = (e) => {
      const element = e.target.closest(".toggle");
      if (e.target.closest(".toggle")) {
        const rect = element.getBoundingClientRect();

        setPosition({
          x: window.innerWidth - rect.width - rect.x,
          y: rect.y + document.documentElement.scrollTop + rect.height,
        });
      }
    };

    document.addEventListener("click", handleMenuPos);

    return () => document.removeEventListener("click", handleMenuPos);
  }, []);

  const openMenu = setOpenId;

  const closeMenu = () => setOpenId("");

  return (
    <MenuContext.Provider value={{ openId, openMenu, closeMenu, position }}>
      {children}
    </MenuContext.Provider>
  );
};

const Toggle = ({ id, Icon }) => {
  const { openId, openMenu, closeMenu } = useContext(MenuContext);

  const handleToggleMenu = (e) => {
    openId !== id ? openMenu(id) : closeMenu();
  };

  return (
    <StyledToggle className="toggle" onClick={(e) => handleToggleMenu(e)}>
      {Icon}
    </StyledToggle>
  );
};

const List = ({ id, children }) => {
  const { openId, position } = useContext(MenuContext);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position}>{children}</StyledList>,
    document.body,
  );
};

const Button = ({ children, icon, onClick }) => {
  const { closeMenu } = useContext(MenuContext);
  const handleClickEvent = () => {
    onClick?.();
    closeMenu();
  };

  return (
    <li>
      <StyledButton onClick={handleClickEvent}>
        {icon} {children}
      </StyledButton>
    </li>
  );
};

Menus.Toggle = Toggle;
Menus.Menu = Menu;
Menus.List = List;
Menus.Button = Button;

export default Menus;
