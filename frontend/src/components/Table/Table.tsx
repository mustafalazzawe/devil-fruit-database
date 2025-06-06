import {
  ChangeEvent,
  FC,
  Fragment,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useDataContext } from "../../providers/Data/Data.context";

import {
  DataItem,
  DataList,
  DataText,
  EmptyActionsContainer,
  EmptyBodyText,
  EmptyBodyTextContainer,
  EmptyContainer,
  EmptyContent,
  EmptyHeaderText,
  EmptyTextContent,
  TableBody,
  TableContainer,
  TableData,
  TableHeader,
  TableRow,
  TableThread,
  TableWrapper,
} from "./Table.styled";
import { ITableProps } from "./Table.types";

import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";
import Sticker from "../Sticker/Sticker";

import sticker from "../../assets/Luffy+Zoro.png";

const Table: FC<ITableProps> = ({ $alternate = false }) => {
  const {
    filteredFruitData,
    showSpoilers,
    isLoading,
    searchState,
    currentPage,
    handleResetFilters,
    handleSearch,
  } = useDataContext();

  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTo({ left: 0, top: 0, behavior: "instant" });
    }
  }, [currentPage]);

  const handleClearSearch = useCallback(() => {
    handleSearch({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
  }, [handleSearch]);

  const handleTableState = useCallback(() => {
    if (isLoading) {
      return <Spinner />;
    }

    if (!searchState) {
      return (
        <EmptyContainer>
          <EmptyContent>
            <Sticker src={sticker} />
            <EmptyTextContent>
              <EmptyHeaderText>No Devil fruits found</EmptyHeaderText>
              <EmptyBodyTextContainer>
                <EmptyBodyText>
                  Your search didn't match any devil fruits or users. Please try
                  again.
                </EmptyBodyText>
              </EmptyBodyTextContainer>
            </EmptyTextContent>
            <EmptyActionsContainer>
              <Button
                onClick={handleClearSearch}
                $variant={{ variantName: "Outline" }}
              >
                Clear Search
              </Button>
              <Button
                onClick={handleResetFilters}
                $variant={{ variantName: "Solid" }}
              >
                Reset Filters
              </Button>
            </EmptyActionsContainer>
          </EmptyContent>
        </EmptyContainer>
      );
    }

    return (
      <Fragment>
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
            </TableRow>
          </TableThread>
          <TableBody $alternate={$alternate}>
            {filteredFruitData?.map((fruit, index) => (
              <TableRow key={index}>
                <TableData>
                  <DataList>
                    {fruit.names.romanized_names.map((rname, rnameIndex) => (
                      <DataItem key={rnameIndex}>
                        <DataText
                          $showSpoilers={showSpoilers}
                          $useSpoilerBlock={rname.is_spoiler}
                          $isArtificial={false}
                        >
                          {rname.name}
                        </DataText>
                      </DataItem>
                    ))}
                  </DataList>
                </TableData>
                <TableData>
                  <DataList>
                    {fruit.names.translated_names.map((tname, tnameIndex) => (
                      <DataItem key={tnameIndex}>
                        <DataText
                          $showSpoilers={showSpoilers}
                          $useSpoilerBlock={tname.is_spoiler}
                          $isArtificial={false}
                        >
                          {tname.name}
                        </DataText>
                      </DataItem>
                    ))}
                  </DataList>
                </TableData>
                <TableData>
                  <DataList>
                    {fruit.types.map((type, typeIndex) => (
                      <DataItem key={typeIndex}>
                        <DataText
                          $showSpoilers={showSpoilers}
                          $useSpoilerBlock={type.is_spoiler}
                          $isArtificial={false}
                        >
                          {type.type}
                        </DataText>
                      </DataItem>
                    ))}
                  </DataList>
                </TableData>
                <TableData>{fruit.ability}</TableData>
                <TableData>
                  {fruit.users.current_users ? (
                    <DataList>
                      {fruit.users.current_users.map((cuser, cuserIndex) => (
                        <DataItem key={cuserIndex}>
                          <DataText
                            $showSpoilers={showSpoilers}
                            $useSpoilerBlock={cuser.is_spoiler}
                            $awakening={{
                              $isAwakend: cuser.awakening.is_awakened,
                              $isSpoiler: cuser.awakening.is_spoiler,
                            }}
                            $isArtificial={cuser.is_artificial}
                            title={
                              cuser.awakening.is_awakened
                                ? "Awakened"
                                : cuser.is_artificial
                                ? "Artificial"
                                : ""
                            }
                          >
                            {cuser.user}
                          </DataText>
                        </DataItem>
                      ))}
                    </DataList>
                  ) : (
                    "None"
                  )}
                </TableData>
                <TableData>
                  {fruit.users.previous_users ? (
                    <DataList>
                      {fruit.users.previous_users.map((puser, puserIndex) => (
                        <DataItem key={puserIndex}>
                          <DataText
                            $showSpoilers={showSpoilers}
                            $useSpoilerBlock={puser.is_spoiler}
                            $awakening={{
                              $isAwakend: puser.awakening.is_awakened,
                              $isSpoiler: puser.awakening.is_spoiler,
                            }}
                            title={
                              puser.awakening.is_awakened ? "Awakened" : ""
                            }
                          >
                            {puser.user}
                          </DataText>
                        </DataItem>
                      ))}
                    </DataList>
                  ) : (
                    "None"
                  )}
                </TableData>
                <TableData>
                  <p>{fruit.is_canon ? "Yes" : "No"}</p>
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </TableWrapper>
      </Fragment>
    );
  }, [
    $alternate,
    filteredFruitData,
    handleClearSearch,
    handleResetFilters,
    isLoading,
    searchState,
    showSpoilers,
  ]);

  return (
    <Fragment>
      <TableContainer ref={tableRef}>{handleTableState()}</TableContainer>
    </Fragment>
  );
};

export default Table;
