import { FC, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useTheme } from "styled-components";

import { useAuthContext } from "../../providers/Auth/Auth.context";
import { useThemeContext } from "../../providers/Theme/Theme.context";
import { INewFruitData } from "../../providers/Data/Data.types";
import { config } from "../../App.config";

import logo from "../../assets/one-piece.png";
import sticker from "../../assets/Luffy+Zoro.png";

import PageWrapper from "../../components/Wrappers/PageWrapper";
import ContentWrapper from "../../components/Wrappers/ContentWrapper";
import HeaderWrapper from "../../components/Wrappers/HeaderWrapper";
import ActionsWrapper from "../../components/Wrappers/ActionsWrapper";
import Button from "../../components/Button/Button";
import Textfield from "../../components/Textfield/Textfield";
import Logo from "../../components/Logo/Logo";
import Sticker from "../../components/Sticker/Sticker";

import { Header } from "../../components/Header/Header.styled";
import {
  TableContainer,
  TableWrapper,
  TableThread,
  TableBody,
  TableRow,
  TableHeader,
  TableData,
  DataList,
  DataItem,
  EmptyContainer,
  EmptyContent,
  EmptyTextContent,
  EmptyHeaderText,
  EmptyBodyTextContainer,
  EmptyBodyText,
  EmptyActionsContainer,
} from "../../components/Table/Table.styled";
import {
  AdminBody,
  AdminTopBar,
  AdminSearchWrapper,
  AdminBodyCard,
  AdminActionsCell,
  AdminActionsContent,
} from "./Admin.styled";
import AdminFruitForm from "../../components/AdminFruitForm/AdminFruitForm";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal/ConfirmDeleteModal";

const API_URL = config.apiUrl;

type TAdminView = "search" | "create" | "edit";

const Admin: FC = () => {
  const { apiKey, logout } = useAuthContext();
  const { mode, toggleMode } = useThemeContext();
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [adminView, setAdminView] = useState<TAdminView>("search");
  const [editingFruit, setEditingFruit] = useState<INewFruitData | null>(null);
  const [deletingFruit, setDeletingFruit] = useState<INewFruitData | null>(
    null
  );

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const { data: allFruits = [] } = useQuery({
    queryKey: ["devilFruits"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/devil-fruits/`);
      return await response.json();
    },
    staleTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const filteredFruits = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const q = searchQuery.toLowerCase();

    return allFruits.filter((fruit: INewFruitData) =>
      fruit.names.romanized_names.some((n) => n.name.toLowerCase().includes(q))
    );
  }, [allFruits, searchQuery]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleDelete = async () => {
    if (!deletingFruit) return;
    setIsDeleting(true);

    try {
      await fetch(`${API_URL}/api/devil-fruits/delete/${deletingFruit.fruit_id}`, {
        method: "DELETE",
        headers: { "X-API-Key": apiKey! },
      });

      queryClient.invalidateQueries(["devilFruits"]);
      setDeletingFruit(null);
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormSuccess = () => {
    queryClient.invalidateQueries(["devilFruits"]);
    setEditingFruit(null);
    setAdminView("search");
  };

  const handleFormCancel = () => {
    setEditingFruit(null);
    setAdminView("search");
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <HeaderWrapper>
          <Logo src={logo} />
          <Header>Admin Dashboard</Header>
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
              onClick={handleLogout}
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
                iconStyle: { iconName: "Logout" },
              }}
            >
              Logout
            </Button>
          </ActionsWrapper>
        </HeaderWrapper>

        <AdminBody>
          {adminView === "create" && (
            <AdminFruitForm
              mode="create"
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          )}

          {adminView === "edit" && editingFruit && (
            <AdminFruitForm
              mode="edit"
              fruit={editingFruit}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          )}

          {deletingFruit && (
            <ConfirmDeleteModal
              fruitName={
                deletingFruit.names.romanized_names[0]?.name ?? "this fruit"
              }
              onConfirm={handleDelete}
              onCancel={() => setDeletingFruit(null)}
              isDeleting={isDeleting}
            />
          )}

          <>
            <AdminTopBar>
              <AdminSearchWrapper>
                <Textfield
                  id="admin-search"
                  placeholder="Search"
                  value={searchQuery}
                  $icon={{
                    hasIcon: true,
                    iconStyle: { iconName: "Search", fontSize: "20px" },
                  }}
                  handleInputChange={(e) => setSearchQuery(e.target.value)}
                />
              </AdminSearchWrapper>
              <Button
                onClick={() => setAdminView("create")}
                $variant={{
                  variantName: "Solid",
                  staticColors: {
                    fgColor: theme.foreground["fg-primary-on-brand"],
                  },
                }}
                $icon={{
                  hasIcon: true,
                  iconStyle: { iconName: "Plus" },
                }}
              >
                Create New
              </Button>
            </AdminTopBar>

            <AdminBodyCard>
              <TableContainer>
                {!searchQuery.trim() && (
                  <EmptyContainer>
                    <EmptyContent>
                      <EmptyTextContent>
                        <EmptyHeaderText>
                          Search for a fruit to manage it
                        </EmptyHeaderText>
                      </EmptyTextContent>
                    </EmptyContent>
                  </EmptyContainer>
                )}

                {searchQuery.trim() && filteredFruits.length === 0 && (
                  <EmptyContainer>
                    <EmptyContent>
                      <Sticker src={sticker} />
                      <EmptyTextContent>
                        <EmptyHeaderText>No devil fruits found</EmptyHeaderText>
                        <EmptyBodyTextContainer>
                          <EmptyBodyText>
                            Your search "{searchQuery}" did not match any devil
                            fruits. Please try again.
                          </EmptyBodyText>
                        </EmptyBodyTextContainer>
                      </EmptyTextContent>
                      <EmptyActionsContainer>
                        <Button
                          onClick={() => setSearchQuery("")}
                          $variant={{ variantName: "Outline" }}
                        >
                          Clear search
                        </Button>
                      </EmptyActionsContainer>
                    </EmptyContent>
                  </EmptyContainer>
                )}

                {searchQuery.trim() && filteredFruits.length > 0 && (
                  <TableWrapper>
                    <TableThread>
                      <TableRow>
                        <TableHeader>Devil Fruit</TableHeader>
                        <TableHeader>English Translations</TableHeader>
                        <TableHeader>Type</TableHeader>
                        <TableHeader>Ability</TableHeader>
                        <TableHeader>Current User(s)</TableHeader>
                        <TableHeader>Previous User(s)</TableHeader>
                        <TableHeader>Canon</TableHeader>
                        <TableHeader />
                      </TableRow>
                    </TableThread>
                    <TableBody>
                      {filteredFruits.map((fruit: INewFruitData) => (
                        <TableRow key={fruit.fruit_id}>
                          <TableData>
                            <DataList>
                              {fruit.names.romanized_names.map((n, i) => (
                                <DataItem key={i}>{n.name}</DataItem>
                              ))}
                            </DataList>
                          </TableData>
                          <TableData>
                            {fruit.names.translated_names.length > 0 ? (
                              <DataList>
                                {fruit.names.translated_names.map((n, i) => (
                                  <DataItem key={i}>{n.name}</DataItem>
                                ))}
                              </DataList>
                            ) : (
                              "None"
                            )}
                          </TableData>
                          <TableData>
                            <DataList>
                              {fruit.types.map((t, i) => (
                                <DataItem key={i}>{t.type}</DataItem>
                              ))}
                            </DataList>
                          </TableData>
                          <TableData>{fruit.ability}</TableData>
                          <TableData>
                            {fruit.users.current_users?.length ? (
                              <DataList>
                                {fruit.users.current_users.map((u, i) => (
                                  <DataItem key={i}>{u.user}</DataItem>
                                ))}
                              </DataList>
                            ) : (
                              "None"
                            )}
                          </TableData>
                          <TableData>
                            {fruit.users.previous_users?.length ? (
                              <DataList>
                                {fruit.users.previous_users.map((u, i) => (
                                  <DataItem key={i}>{u.user}</DataItem>
                                ))}
                              </DataList>
                            ) : (
                              "None"
                            )}
                          </TableData>
                          <TableData>
                            {fruit.is_canon ? "Yes" : "No"}
                          </TableData>
                          <AdminActionsCell>
                            <AdminActionsContent>
                              <Button
                                onClick={() => {
                                  setEditingFruit(fruit);
                                  setAdminView("edit");
                                }}
                                $variant={{ variantName: "IconOutline" }}
                                $icon={{
                                  hasIcon: true,
                                  iconStyle: {
                                    iconName: "Edit",
                                    fontSize: "18px",
                                  },
                                }}
                              />
                              <Button
                                onClick={() => setDeletingFruit(fruit)}
                                $variant={{ variantName: "IconDestructive" }}
                                $icon={{
                                  hasIcon: true,
                                  iconStyle: {
                                    iconName: "Trash",
                                    fontSize: "18px",
                                  },
                                }}
                              />
                            </AdminActionsContent>
                          </AdminActionsCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </TableWrapper>
                )}
              </TableContainer>
            </AdminBodyCard>
          </>
        </AdminBody>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Admin;
