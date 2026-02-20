import { FC } from "react";

import { useTheme } from "styled-components";

import { useThemeContext } from "../../providers/Theme/Theme.context";
import { useDataContext } from "../../providers/Data/Data.context";

import logo from "../../assets/one-piece.png";

import PageWrapper from "../../components/Wrappers/PageWrapper";
import HeaderWrapper from "../../components/Wrappers/HeaderWrapper";
import ActionsWrapper from "../../components/Wrappers/ActionsWrapper";
import BodyWrapper from "../../components/Wrappers/BodyWrapper";
import ContentWrapper from "../../components/Wrappers/ContentWrapper";
import BodyActionsWrapper from "../../components/Wrappers/BodyActionsWrapper";
import ToggleWrapper from "../../components/Wrappers/ToggleWrapper";
import BodyContentWrapper from "../../components/Wrappers/BodyContentWrapper";
import SearchActionsWrapper from "../../components/Wrappers/SearchActionsWrapper";

import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import Logo from "../../components/Logo/Logo";

import Table from "../../components/Table/Table";
import Legend from "../../components/Legend/Legend";
import SearchBar from "../../components/SearchBar/SearchBar";
import Modal from "../../components/Modal/Modal";
import Export from "../../components/Export/Export";
import Pagination from "../../components/Pagination/Pagination";

import { Header } from "../../components/Header/Header.styled";
import { useModalContext } from "../../providers/Modal/Modal.context";
import FooterWrapper from "../../components/Wrappers/FooterWrapper";
import Filters from "../../components/Filters/Filters";

export const Home: FC = () => {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeContext();
  const {
    totalItems,
    showSpoilers,
    showNonCanon,
    isLoading,
    isError,
    itemsPerPageOptions,
    handleShowSpoilers,
    handleShowNonCanon,
  } = useDataContext();
  const { isModalOpen, modalContent, openModal } = useModalContext();

  return (
    <PageWrapper>
      {isModalOpen && <Modal>{modalContent}</Modal>}
      <ContentWrapper>
        <HeaderWrapper>
          <Logo src={logo} />
          <Header>Devil Fruit Database</Header>
          <ActionsWrapper>
            <Button
              onClick={toggleMode}
              $variant={{ variantName: "Outline" }}
              $minwidth={{ desktop: "132px", mobile: "auto" }}
              $fillContainer={true}
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
              disabled={isError || isLoading}
              onClick={() => openModal(<Export />)}
              $variant={{
                variantName: "Solid",
                staticColors: {
                  fgColor: theme.foreground["fg-primary-on-brand"],
                },
              }}
              $minwidth={{ desktop: "132px", mobile: "auto" }}
              $fillContainer={true}
              $icon={{
                hasIcon: true,
                iconStyle: {
                  iconName: "Download",
                },
              }}
            >
              Export
            </Button>
          </ActionsWrapper>
        </HeaderWrapper>

        <BodyWrapper>
          <BodyActionsWrapper>
            <ToggleWrapper>
              <Checkbox
                name="show-spoilers"
                $variant="AccentPrimary"
                $label={{
                  hasLabel: true,
                  ascendingLabel: true,
                  labelText: "Show Spoilers",
                }}
                $handleState={handleShowSpoilers}
                checked={showSpoilers}
              />
              <Checkbox
                name="show-noncanon"
                $variant="AccentPrimary"
                $label={{
                  hasLabel: true,
                  ascendingLabel: true,
                  labelText: "Show Non-Canon",
                }}
                $handleState={handleShowNonCanon}
                checked={showNonCanon}
              />
            </ToggleWrapper>
            <SearchActionsWrapper>
              <SearchBar />
              <Filters />
            </SearchActionsWrapper>
          </BodyActionsWrapper>
          <BodyContentWrapper>
            <Table $alternate={false} />

            <FooterWrapper>
              <Legend />
              <Pagination results={totalItems} options={itemsPerPageOptions} />
            </FooterWrapper>
          </BodyContentWrapper>
        </BodyWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Home;
