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

interface IFruitData {
  fruit_id: string;
  names: {
    romanized_names: { name: string; is_spoiler: boolean }[];
    translated_names: { name: string; is_spoiler: boolean }[];
  };
  types: { type: string; is_spoiler: boolean }[];
  abilities: {
    ability: string;
    awakened_ability: string | null;
  };
  users: {
    current_users:
      | {
          user: string;
          is_artificial: boolean;
          is_spoiler: boolean;
          awakening: { is_awakened: boolean; is_spoiler: boolean };
        }[]
      | null;
    previous_users:
      | {
          user: string;
          is_spoiler: boolean;
          awakening: { is_awakened: boolean; is_spoiler: boolean };
        }[]
      | null;
  };
  is_canon: boolean;
}

const fruitData: IFruitData[] = [
  {
    fruit_id: "8933e317-1f46-48b6-a6f8-9d0c96113a25",
    names: {
      romanized_names: [
        {
          name: "Gomu Gomu no Mi",
          is_spoiler: false,
        },
        {
          name: "Hito Hito no Mi, Model: Nika",
          is_spoiler: true,
        },
      ],
      translated_names: [
        {
          name: "Gum-Gum Fruit",
          is_spoiler: false,
        },
        {
          name: "Human-Human Fruit, Nika Model",
          is_spoiler: true,
        },
      ],
    },
    types: [
      {
        type: "Paramecia",
        is_spoiler: false,
      },
      {
        type: "Mythical Zoan",
        is_spoiler: true,
      },
    ],
    abilities: {
      ability:
        "Turns the user's body into rubber, giving them the power to stretch, bounce, and inflate, as well as making them immune to electricity and near impervious to blunt-force attacks and bullets.",
      awakened_ability: null,
    },
    users: {
      current_users: [
        {
          user: "Monkey D. Luffy",
          is_artificial: false,
          is_spoiler: false,
          awakening: { is_awakened: true, is_spoiler: true },
        },
      ],
      previous_users: [
        {
          user: "Joy Boy",
          is_spoiler: true,
          awakening: { is_awakened: true, is_spoiler: false },
        },
      ],
    },
    is_canon: true,
  },
  {
    fruit_id: "5338f391-5273-45c7-a26c-2be16d65465b",
    names: {
      romanized_names: [
        {
          name: "Uo Uo no Mi, Model: Seiryu",
          is_spoiler: false,
        },
      ],
      translated_names: [
        {
          name: "Fish-Fish Fruit, Azure Dragon Model",
          is_spoiler: false,
        },
      ],
    },
    types: [
      {
        type: "Mythical Zoan",
        is_spoiler: false,
      },
    ],
    abilities: {
      ability:
        "Allows the user to become a full Azure Dragon or a half-Azure Dragon hybrid.",
      awakened_ability: null,
    },
    users: {
      current_users: [
        {
          user: "Kaidou",
          is_artificial: false,
          is_spoiler: false,
          awakening: { is_awakened: false, is_spoiler: false },
        },
        {
          user: "Kozuki Momonosuke",
          is_artificial: true,
          is_spoiler: true,
          awakening: { is_awakened: false, is_spoiler: false },
        },
      ],
      previous_users: null,
    },
    is_canon: true,
  },
  {
    fruit_id: "2864e4a8-81ea-4157-8fb5-d080caa873fe",
    names: {
      romanized_names: [
        {
          name: "Mera Mera no Mi",
          is_spoiler: false,
        },
      ],
      translated_names: [
        {
          name: "Flame-Flame Fruit",
          is_spoiler: false,
        },
        {
          name: "Flare-Flare Fruit",
          is_spoiler: false,
        },
      ],
    },
    types: [
      {
        type: "Logia",
        is_spoiler: false,
      },
    ],
    abilities: {
      ability: "Allows the user to create, control, and transform into fire.",
      awakened_ability: null,
    },
    users: {
      current_users: [
        {
          user: "Sabo",
          is_artificial: false,
          is_spoiler: true,
          awakening: { is_awakened: false, is_spoiler: false },
        },
      ],
      previous_users: [
        {
          user: "Portgas D. Ace",
          is_spoiler: true,
          awakening: { is_awakened: false, is_spoiler: false },
        },
      ],
    },
    is_canon: true,
  },
  {
    fruit_id: "c4a64c5a-5023-4fbf-afb2-e5e67d0a7ba6",
    names: {
      romanized_names: [
        {
          name: "Ito Ito no Mi",
          is_spoiler: false,
        },
      ],
      translated_names: [
        {
          name: "String-String Fruit",
          is_spoiler: false,
        },
      ],
    },
    types: [
      {
        type: "Paramecia",
        is_spoiler: false,
      },
    ],
    abilities: {
      ability: "Allows the user to create and control strings.",
      awakened_ability:
        "Allows the user to transmute the surrounding area, like the ground and buildings, into strings as well, which they can utilize for much stronger attacks and defense.",
    },
    users: {
      current_users: [
        {
          user: "Donquixote Doflamingo",
          is_artificial: false,
          is_spoiler: false,
          awakening: { is_awakened: true, is_spoiler: false },
        },
      ],
      previous_users: null,
    },
    is_canon: true,
  },
  {
    fruit_id: "e4fdcd35-d6ba-4607-8f45-1af1fe81ff5b",
    names: {
      romanized_names: [
        {
          name: "Ope Ope no Mi",
          is_spoiler: false,
        },
      ],
      translated_names: [
        {
          name: "Op-Op Fruit",
          is_spoiler: false,
        },
      ],
    },
    types: [
      {
        type: "Paramecia",
        is_spoiler: false,
      },
    ],
    abilities: {
      ability:
        "Allows the user to manifest a large sphere of aura, inside which they can manipulate the fabric of space, allowing the user to teleport, telekinetically move things, cleave things without actually damaging them, reassemble things into various combinations, and generate high voltage energy.",
      awakened_ability:
        "Allows the user the ability to create special ROOMs that adhere directly to foreign objects or living beings instead of surrounding a specific space around the user, not requiring their presence within the operating field for techniques to be performed (unlike normal ROOMs, where the user needs to be inside at all times).",
    },
    users: {
      current_users: [
        {
          user: "Trafalgar D. Water Law",
          is_artificial: false,
          is_spoiler: false,
          awakening: { is_awakened: true, is_spoiler: true },
        },
      ],
      previous_users: [
        {
          user: "Unnamed doctor",
          is_spoiler: false,
          awakening: { is_awakened: false, is_spoiler: false },
        },
      ],
    },
    is_canon: true,
  },
  {
    fruit_id: "5be09cdb-30d4-4baa-b346-92fb898153e6",
    names: {
      romanized_names: [
        {
          name: "Hito Hito no Mi",
          is_spoiler: false,
        },
      ],
      translated_names: [
        {
          name: "Human-Human Fruit",
          is_spoiler: false,
        },
      ],
    },
    types: [
      {
        type: "Zoan",
        is_spoiler: false,
      },
    ],
    abilities: {
      ability:
        "Allows an animal that eats it to become a full human or a half-human hybrid, as well as grant them human-like intelligence and the ability to speak.",
      awakened_ability: null,
    },
    users: {
      current_users: [
        {
          user: "Tony Tony Chopper",
          is_artificial: false,
          is_spoiler: false,
          awakening: { is_awakened: false, is_spoiler: false },
        },
      ],
      previous_users: null,
    },
    is_canon: true,
  },
  {
    fruit_id: "b2167a97-2bd9-4cf9-a16f-ba665c369ff4",
    names: {
      romanized_names: [
        {
          name: "Neko Neko no Mi, Model: Leopard",
          is_spoiler: false,
        },
      ],
      translated_names: [
        {
          name: "Cat-Cat Fruit, Leopard Model",
          is_spoiler: false,
        },
      ],
    },
    types: [
      {
        type: "Zoan",
        is_spoiler: false,
      },
    ],
    abilities: {
      ability:
        "Allows the user to become a full leopard or a half-leopard hybrid.",
      awakened_ability: null,
    },
    users: {
      current_users: [
        {
          user: "Rob Lucci",
          is_artificial: false,
          is_spoiler: true,
          awakening: { is_awakened: true, is_spoiler: true },
        },
      ],
      previous_users: null,
    },
    is_canon: true,
  },
  {
    fruit_id: "a5381619-17c9-4d74-a84c-db5dd5442665",
    names: {
      romanized_names: [
        {
          name: "Tori Tori no Mi, Model: Eagle",
          is_spoiler: false,
        },
      ],
      translated_names: [
        {
          name: "Bird-Bird Fruit, Eagle Model",
          is_spoiler: false,
        },
      ],
    },
    types: [
      {
        type: "Zoan",
        is_spoiler: false,
      },
    ],
    abilities: {
      ability: "Allows the user to become a full eagle or a half-eagle hybrid.",
      awakened_ability: null,
    },
    users: {
      current_users: [
        {
          user: "Buzz",
          is_artificial: false,
          is_spoiler: false,
          awakening: { is_awakened: false, is_spoiler: false },
        },
      ],
      previous_users: null,
    },
    is_canon: false,
  },
];

const Table: FC = () => {
  const { showSpoilers, showNonCanon } = useDataContext();

  const filteredFruitData = showNonCanon
    ? fruitData
    : fruitData.filter((fruit) => fruit.is_canon);

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
