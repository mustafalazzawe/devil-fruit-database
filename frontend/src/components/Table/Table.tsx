import { FC } from "react";
import TableWrapper, {
  DataItem,
  DataList,
  DataText,
  TableBody,
  TableContainer,
  TableData,
  TableHeader,
  TableRow,
  TableThread,
} from "./Table.styled";
import { useDataContext } from "../../providers/Data/Data.context";

const Table: FC = () => {
  const { filteredFruitData, showSpoilers } = useDataContext();

  return (
    <TableContainer>
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
        <TableBody>
          {filteredFruitData.map((fruit, index) => (
            <TableRow key={index}>
              <TableData>
                <DataList>
                  {fruit.names.romanized_names.map((rname, rnameIndex) => (
                    <DataItem key={rnameIndex}>
                      <DataText
                        $showSpoilers={showSpoilers}
                        $useSpoilerBlock={rname.is_spoiler}
                        $isArtifical={false}
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
                        $isArtifical={false}
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
                        $isArtifical={false}
                      >
                        {type.type}
                      </DataText>
                    </DataItem>
                  ))}
                </DataList>
              </TableData>
              <TableData>{fruit.abilities.ability}</TableData>

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
                          $isArtifical={cuser.is_artificial}
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
                          title={puser.awakening.is_awakened ? "Awakened" : ""}
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
    </TableContainer>
  );
};

export default Table;
