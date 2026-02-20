import styled, { css } from "styled-components";

import { IDataTextProps, ITableProps } from "./Table.types";
import {
  artificalTextStyles,
  awakeningTextStyles,
  defaultTextStyles,
  spoilerBlockStyles,
} from "./Table.styles";

export const TableContainer = styled.div`
  position: relative;

  flex: 1 0 0;

  width: 100%;
  height: 100%;

  min-height: 128px;

  border-radius: 2px;
  ${({ theme }) => theme.commonBorder};

  overflow: auto;
  scrollbar-gutter: auto;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 16px 16px
      ${({ theme }) => theme.background["bg-tertiary"]};
    border: 3px solid ${({ theme }) => theme.background["bg-primary"]};
    border-radius: 8px;

    min-height: 40px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 16px 16px
      ${({ theme }) => theme.background["bg-secondary"]};
    border: solid 3px ${({ theme }) => theme.background["bg-primary"]};

    border-radius: 8px;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    -webkit-overflow-scrolling: touch;
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;

  width: 100%;
  min-height: 100%;

  padding: 24px 16px;

  &::before,
  &::after {
    content: "";
    display: block;
    position: sticky;

    left: 0;

    width: 100%;
    height: 10px;

    background: inherit;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
`;

export const EmptyContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;

  padding: 24px;

  max-width: 100%;
  max-height: 100%;
`;

export const EmptyTextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  padding: 0 16px;

  max-width: 100%;

  text-align: center;
`;

export const EmptyActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const EmptyHeaderText = styled.p`
  ${({ theme }) => theme.bodySmall}
  color: ${({ theme }) => theme.foreground["fg-disabled"]};
`;

export const EmptyBodyTextContainer = styled.div`
  ${({ theme }) => theme.bodySmall}
  color: ${({ theme }) => theme.commonForeground["fg-disabled"]};

  padding: 0 16px;

  max-width: 100%;

  text-align: center;
`;

export const EmptyBodyText = styled.span``;

export const EmptySearchQuery = styled.div`
  padding: 0 16px;

  max-width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TableWrapper = styled.table`
  width: 100%;

  border-collapse: separate;
  border-spacing: 0;

  /* Prevent layout shift, consistent cell sizing */
  /* table-layout: fixed; */
  /* box-sizing: border-box; */

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    min-width: 600px;
  }
`;

export const TableThread = styled.thead`
  position: sticky;

  top: 0;

  background-color: ${({ theme }) => theme.background["bg-primary"]};

  z-index: 1;

  isolation: isolate;

  &::after {
    content: "";
    position: absolute;

    left: 0;
    right: 0;
    bottom: 0;

    height: 1px;

    background-color: ${({ theme }) => theme.border["border-primary"]};
  }
`;

export const TableBody = styled.tbody<ITableProps>`
  ${({ $alternate, theme }) =>
    $alternate &&
    css`
      tr:nth-child(odd) {
        background-color: ${theme.background["bg-secondary"]};
      }
    `}

  tr:last-of-type {
    border-bottom: none;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.border["border-primary"]};
`;

export const TableHeader = styled.th`
  position: relative;

  color: ${({ theme }) => theme.foreground["fg-primary"]};

  padding: 8px 16px;
  text-align: left;

  ${({ theme }) => theme.label}

  border: 0;

  /* Prevent text wrapping by default */
  /* white-space: nowrap; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */

  &::after {
    content: "";
    position: absolute;

    right: 0;
    bottom: 0;

    width: 1px;
    height: 100%;

    background-color: ${({ theme }) => theme.border["border-primary"]};
  }

  &:last-child::after {
    display: none;
  }

  tr & {
    border-bottom: 1px solid ${({ theme }) => theme.border["border-primary"]};
  }
`;

export const TableData = styled.td`
  position: relative;

  color: ${({ theme }) => theme.foreground["fg-primary"]};

  padding: 8px 16px;
  text-align: left;
  vertical-align: top;

  ${({ theme }) => theme.bodySmall}

  /* Improve cell content wrapping */
  /* word-break: break-word; */
  /* hyphens: auto; */

  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.border["border-primary"]};

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 1px;
    background-color: ${({ theme }) => theme.border["border-primary"]};
  }

  &:last-child::after {
    display: none;
  }
`;

export const DataList = styled.ul`
  list-style-type: none;

  margin: 0;
  padding: 0;
`;

export const DataItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

export const DataText = styled.p<IDataTextProps>`
  ${({
    theme,
    $showSpoilers,
    $useSpoilerBlock,
    $awakening,
    $isArtificial,
  }) => css`
    --color: ${theme.foreground["fg-primary"]};
    --font-weight: 400;

    color: var(--color);
    font-weight: var(--font-weight);

    cursor: default;

    ${$isArtificial &&
    css`
      ${artificalTextStyles}
      ${!$showSpoilers && !$useSpoilerBlock && defaultTextStyles}
    `}

    ${$awakening?.$isAwakend &&
    css`
      ${awakeningTextStyles}
      ${!$showSpoilers &&
      !$useSpoilerBlock &&
      $awakening.$isSpoiler &&
      defaultTextStyles}
    `}

    ${$useSpoilerBlock && spoilerBlockStyles($showSpoilers, theme)};
  `}
`;
