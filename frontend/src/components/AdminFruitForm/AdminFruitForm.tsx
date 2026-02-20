import { Dispatch, FC, SetStateAction, useState } from "react";

import { useAuthContext } from "../../providers/Auth/Auth.context";
import { config } from "../../App.config";

import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import Select from "../Select/Select";
import Textfield from "../Textfield/Textfield";
import { Icon } from "../Icon/Icon";

import {
  IAdminFruitFormProps,
  INameEntry,
  ITypeEntry,
  IUserEntry,
} from "./AdminFruitForm.types";
import {
  AddFieldButton,
  AdminFruitFormBody,
  AdminFruitFormContainer,
  AdminFruitFormFooter,
  AdminFruitFormHeader,
  AdminFruitFormOverlay,
  AdminFruitFormTitle,
  AwakeningCheckboxes,
  AwakeningLabel,
  AwakeningRow,
  ErrorMessage,
  FormField,
  FormFieldLabel,
  FormSection,
  RepeatableList,
  RepeatableRow,
  SectionDivider,
  SectionLabel,
  SubSection,
  UserEntryWrapper,
} from "./AdminFruitForm.styled";

const API_URL = config.apiUrl;

const FRUIT_TYPES = [
  "Zoan",
  "Ancient Zoan",
  "Mythical Zoan",
  "Logia",
  "Paramecia",
  "Special Paramecia",
  "Undetermined",
] as const;

const emptyUser = (): IUserEntry => ({
  user: "",
  is_artificial: false,
  is_spoiler: false,
  awakening: { is_awakened: false, is_spoiler: false },
});

const addEntry = <T,>(
  setter: Dispatch<SetStateAction<T[]>>,
  entry: T
) => setter((prev) => [...prev, entry]);

const removeEntry = <T,>(
  setter: Dispatch<SetStateAction<T[]>>,
  index: number
) => setter((prev) => prev.filter((_, i) => i !== index));

const updateEntry = <T,>(
  setter: Dispatch<SetStateAction<T[]>>,
  index: number,
  patch: Partial<T>
) =>
  setter((prev) =>
    prev.map((e, i) => (i === index ? { ...e, ...patch } : e))
  );

const AdminFruitForm: FC<IAdminFruitFormProps> = ({
  mode,
  fruit,
  onSuccess,
  onCancel,
}) => {
  const { apiKey } = useAuthContext();

  const isEdit = mode === "edit";

  const [ability, setAbility] = useState(fruit?.ability ?? "");
  const [awakenedAbility, setAwakenedAbility] = useState(
    fruit?.awakened_ability ?? ""
  );
  const [isCanon, setIsCanon] = useState(fruit?.is_canon ?? true);

  const [romanizedNames, setRomanizedNames] = useState<INameEntry[]>(
    isEdit && fruit
      ? fruit.names.romanized_names
      : [{ name: "", is_spoiler: false }]
  );
  const [translatedNames, setTranslatedNames] = useState<INameEntry[]>(
    isEdit && fruit ? fruit.names.translated_names : []
  );
  const [types, setTypes] = useState<ITypeEntry[]>(
    isEdit && fruit ? fruit.types : []
  );
  const [currentUsers, setCurrentUsers] = useState<IUserEntry[]>(
    isEdit && fruit
      ? (fruit.users.current_users ?? []).map((u) => ({
          user: u.user,
          is_artificial: u.is_artificial,
          is_spoiler: u.is_spoiler,
          awakening: {
            is_awakened: u.awakening?.is_awakened ?? false,
            is_spoiler: u.awakening?.is_spoiler ?? false,
          },
        }))
      : []
  );
  const [previousUsers, setPreviousUsers] = useState<IUserEntry[]>(
    isEdit && fruit
      ? (fruit.users.previous_users ?? []).map((u) => ({
          user: u.user,
          is_artificial: u.is_artificial,
          is_spoiler: u.is_spoiler,
          awakening: {
            is_awakened: u.awakening?.is_awakened ?? false,
            is_spoiler: u.awakening?.is_spoiler ?? false,
          },
        }))
      : []
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      const body = {
        ability: ability.trim(),
        awakened_ability: awakenedAbility.trim() || null,
        is_canon: isCanon,
        names: {
          romanized_names: romanizedNames.filter((n) => n.name.trim()),
          translated_names: translatedNames.filter((n) => n.name.trim()),
        },
        types: types.filter((t) => t.type),
        users: {
          current_users: currentUsers.filter((u) => u.user.trim()),
          previous_users: previousUsers.filter((u) => u.user.trim()),
        },
      };

      const url = isEdit
        ? `${API_URL}/api/devil-fruits/update/${fruit!.fruit_id}`
        : `${API_URL}/api/devil-fruits/create/`;
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey!,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`${isEdit ? "Update" : "Create"} failed (${res.status})`);

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderNameRows = (
    entries: INameEntry[],
    setter: Dispatch<SetStateAction<INameEntry[]>>,
    placeholder: string
  ) => (
    <RepeatableList>
      {entries.map((entry, i) => (
        <RepeatableRow key={i}>
          <Textfield
            id={`${placeholder}-${i}`}
            placeholder={placeholder}
            value={entry.name}
            handleInputChange={(e) =>
              updateEntry(setter, i, { name: e.target.value })
            }
          />
          <Checkbox
            name={`${placeholder}-spoiler-${i}`}
            $variant="AccentPrimary"
            $label={{
              hasLabel: true,
              ascendingLabel: false,
              labelText: "Spoiler?",
            }}
            $handleState={() =>
              updateEntry(setter, i, { is_spoiler: !entry.is_spoiler })
            }
            checked={entry.is_spoiler}
          />
          <Button
            onClick={() => removeEntry(setter, i)}
            $variant={{ variantName: "TextDestructive" }}
          >
            Remove
          </Button>
        </RepeatableRow>
      ))}
      <AddFieldButton
        type="button"
        onClick={() => addEntry(setter, { name: "", is_spoiler: false })}
      >
        Add Field
        <Icon iconName="Plus" fontSize="16px" />
      </AddFieldButton>
    </RepeatableList>
  );

  const renderTypeRows = () => (
    <RepeatableList>
      {types.map((entry, i) => (
        <RepeatableRow key={i}>
          <Select
            value={entry.type}
            options={FRUIT_TYPES}
            onChange={(value) => updateEntry(setTypes, i, { type: value })}
          />
          <Checkbox
            name={`type-spoiler-${i}`}
            $variant="AccentPrimary"
            $label={{
              hasLabel: true,
              ascendingLabel: false,
              labelText: "Spoiler?",
            }}
            $handleState={() =>
              updateEntry(setTypes, i, { is_spoiler: !entry.is_spoiler })
            }
            checked={entry.is_spoiler}
          />
          <Button
            onClick={() => removeEntry(setTypes, i)}
            $variant={{ variantName: "TextDestructive" }}
          >
            Remove
          </Button>
        </RepeatableRow>
      ))}
      <AddFieldButton
        type="button"
        onClick={() =>
          addEntry(setTypes, { type: "Paramecia", is_spoiler: false })
        }
      >
        Add Field
        <Icon iconName="Plus" fontSize="16px" />
      </AddFieldButton>
    </RepeatableList>
  );

  const renderUserRows = (
    entries: IUserEntry[],
    setter: Dispatch<SetStateAction<IUserEntry[]>>,
    idPrefix: string
  ) => (
    <RepeatableList>
      {entries.map((entry, i) => (
        <UserEntryWrapper key={i}>
          <RepeatableRow>
            <Textfield
              id={`${idPrefix}-user-${i}`}
              placeholder="User name"
              value={entry.user}
              handleInputChange={(e) =>
                updateEntry(setter, i, { user: e.target.value })
              }
            />
            <Checkbox
              name={`${idPrefix}-spoiler-${i}`}
              $variant="AccentPrimary"
              $label={{
                hasLabel: true,
                ascendingLabel: false,
                labelText: "Spoiler?",
              }}
              $handleState={() =>
                updateEntry(setter, i, { is_spoiler: !entry.is_spoiler })
              }
              checked={entry.is_spoiler}
            />
            <Checkbox
              name={`${idPrefix}-artificial-${i}`}
              $variant="AccentPrimary"
              $label={{
                hasLabel: true,
                ascendingLabel: false,
                labelText: "Artificial?",
              }}
              $handleState={() =>
                updateEntry(setter, i, {
                  is_artificial: !entry.is_artificial,
                })
              }
              checked={entry.is_artificial}
            />
            <Button
              onClick={() => removeEntry(setter, i)}
              $variant={{ variantName: "TextDestructive" }}
            >
              Remove
            </Button>
          </RepeatableRow>
          <AwakeningRow>
            <AwakeningLabel>AWAKENING</AwakeningLabel>
            <AwakeningCheckboxes>
              <Checkbox
                name={`${idPrefix}-awakened-${i}`}
                $variant="AccentPrimary"
                $label={{
                  hasLabel: true,
                  ascendingLabel: false,
                  labelText: "Awakened?",
                }}
                $handleState={() =>
                  updateEntry(setter, i, {
                    awakening: {
                      ...entry.awakening,
                      is_awakened: !entry.awakening.is_awakened,
                    },
                  })
                }
                checked={entry.awakening.is_awakened}
              />
              <Checkbox
                name={`${idPrefix}-awakening-spoiler-${i}`}
                $variant="AccentPrimary"
                $label={{
                  hasLabel: true,
                  ascendingLabel: false,
                  labelText: "Spoiler?",
                }}
                $handleState={() =>
                  updateEntry(setter, i, {
                    awakening: {
                      ...entry.awakening,
                      is_spoiler: !entry.awakening.is_spoiler,
                    },
                  })
                }
                checked={entry.awakening.is_spoiler}
              />
            </AwakeningCheckboxes>
          </AwakeningRow>
        </UserEntryWrapper>
      ))}
      <AddFieldButton
        type="button"
        onClick={() => addEntry(setter, emptyUser())}
      >
        Add Field
        <Icon iconName="Plus" fontSize="16px" />
      </AddFieldButton>
    </RepeatableList>
  );

  return (
    <AdminFruitFormOverlay onClick={onCancel}>
      <AdminFruitFormContainer onClick={(e) => e.stopPropagation()}>
        <AdminFruitFormHeader>
          <AdminFruitFormTitle>
            {isEdit
              ? `Edit: ${fruit?.names.romanized_names[0]?.name ?? "Fruit"}`
              : "Create Devil Fruit"}
          </AdminFruitFormTitle>
        </AdminFruitFormHeader>

        <AdminFruitFormBody>
          {/* Names — Romanized + Translated share a section (no divider between) */}
          <FormSection>
            <SubSection>
              <SectionLabel>Romanized Names {!isEdit && "*"}</SectionLabel>
              {renderNameRows(
                romanizedNames,
                setRomanizedNames,
                "Romanized name"
              )}
            </SubSection>

            <SubSection style={{ marginTop: "8px" }}>
              <SectionLabel>Translated Names</SectionLabel>
              {renderNameRows(
                translatedNames,
                setTranslatedNames,
                "Translated name"
              )}
            </SubSection>
          </FormSection>

          <SectionDivider />

          {/* Type */}
          <FormSection>
            <SectionLabel>Type {!isEdit && "*"}</SectionLabel>
            {renderTypeRows()}
          </FormSection>

          <SectionDivider />

          {/* Abilities */}
          <FormSection>
            <SectionLabel>Abilities</SectionLabel>
            <FormField>
              <FormFieldLabel htmlFor="ability">
                Ability {!isEdit && "*"}
              </FormFieldLabel>
              <Textfield
                id="ability"
                placeholder="Describe the fruit's ability..."
                value={ability}
                handleInputChange={(e) => setAbility(e.target.value)}
              />
            </FormField>
            <FormField>
              <FormFieldLabel htmlFor="awakened-ability">
                Awakened Ability
              </FormFieldLabel>
              <Textfield
                id="awakened-ability"
                placeholder="Describe the fruit's awakened ability..."
                value={awakenedAbility}
                handleInputChange={(e) => setAwakenedAbility(e.target.value)}
              />
            </FormField>
          </FormSection>

          <SectionDivider />

          {/* Users — Current + Previous share a section (no divider between) */}
          <FormSection>
            <SubSection>
              <SectionLabel>Current Users</SectionLabel>
              {renderUserRows(currentUsers, setCurrentUsers, "current")}
            </SubSection>

            <SubSection style={{ marginTop: "8px" }}>
              <SectionLabel>Previous Users</SectionLabel>
              {renderUserRows(previousUsers, setPreviousUsers, "previous")}
            </SubSection>
          </FormSection>

          <SectionDivider />

          {/* Metadata */}
          <FormSection>
            <SectionLabel>Metadata</SectionLabel>
            <Checkbox
              name="is-canon"
              $variant="AccentPrimary"
              $label={{
                hasLabel: true,
                ascendingLabel: false,
                labelText: "Canon?",
              }}
              $handleState={() => setIsCanon(!isCanon)}
              checked={isCanon}
            />
          </FormSection>
        </AdminFruitFormBody>

        <AdminFruitFormFooter>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button
            onClick={onCancel}
            $variant={{ variantName: "Outline" }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            $variant={{ variantName: "Solid" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </AdminFruitFormFooter>
      </AdminFruitFormContainer>
    </AdminFruitFormOverlay>
  );
};

export default AdminFruitForm;
