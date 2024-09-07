import { FC } from "react";

import { useTheme } from "styled-components";

import { useThemeContext } from "./providers/Theme/Theme.context";
import { useDataContext } from "./providers/Data/Data.context";

import Button from "./components/Button/Button";
import PageWrapper from "./components/Wrappers/PageWrapper";
import HeaderWrapper from "./components/Wrappers/HeaderWrapper";
import Logo from "./components/Logo/Logo";
import Header from "./components/Header/Header.styled";
import ActionsWrapper from "./components/Wrappers/ActionsWrapper";

import logo from "./assets/one-piece.png";
import BodyWrapper from "./components/Wrappers/BodyWrapper";
import ContentWrapper from "./components/Wrappers/ContentWrapper";
import BodyActionsWrapper from "./components/Wrappers/BodyActionsWrapper";
import ToggleWrapper from "./components/Wrappers/ToggleWrapper";
import Checkbox from "./components/Checkbox/Checkbox";
import BodyContentWrapper from "./components/Wrappers/BodyContentWrapper";
import SearchActionsWrapper from "./components/Wrappers/SearchActionsWrapper";
import Table from "./components/Table/Table";
import Legend from "./components/Legend/Legend";
import SearchBar from "./components/SearchBar/SearchBar";

export const App: FC = () => {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeContext();
  const { showSpoilers, showNonCanon, handleShowSpoilers, handleShowNonCanon } =
    useDataContext();

  return (
    <PageWrapper>
      <ContentWrapper>
        <HeaderWrapper>
          <Logo src={logo} />
          <Header>Devil Fruit Database</Header>
          <ActionsWrapper>
            <Button
              onClick={toggleMode}
              $variant={{ variantName: "Outline" }}
              $minwidth={{ desktop: "132px", mobile: "auto" }}
              $icon={{
                hasIcon: true,
                iconStyle: {
                  iconName: mode === "light" ? "Moon" : "Sun",
                },
              }}
            >
              {mode === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
            <Button
              $variant={{
                variantName: "Solid",
                staticColors: {
                  fgColor: theme.foreground["fg-primary-on-brand"],
                },
              }}
              $minwidth={{ desktop: "132px", mobile: "auto" }}
              $icon={{
                hasIcon: true,
                iconStyle: {
                  iconName: "Download",
                },
              }}
            >
              Download
            </Button>
          </ActionsWrapper>
        </HeaderWrapper>

        <BodyWrapper>
          <BodyActionsWrapper>
            <ToggleWrapper>
              <Checkbox
                name="show-spoilers"
                $variant="AccentPrimary"
                $label={{ hasLabel: true, labelText: "Show Spoilers" }}
                $handleState={handleShowSpoilers}
                checked={showSpoilers}
              />
              <Checkbox
                name="show-noncanon "
                $variant="AccentPrimary"
                $label={{ hasLabel: true, labelText: "Show Non-Canon" }}
                $handleState={handleShowNonCanon}
                checked={showNonCanon}
              />
            </ToggleWrapper>
            <SearchActionsWrapper>
              <SearchBar />
            </SearchActionsWrapper>
          </BodyActionsWrapper>
          <BodyContentWrapper>
            <Table $alternate={false} />
            <Legend />
          </BodyContentWrapper>
        </BodyWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default App;
