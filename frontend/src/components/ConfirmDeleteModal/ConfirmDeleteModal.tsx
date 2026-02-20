import { FC } from "react";
import Button from "../Button/Button";
import { IConfirmDeleteModalProps } from "./ConfirmDeleteModal.types";
import {
  DeleteActions,
  DeleteBody,
  DeleteDialog,
  DeleteOverlay,
  DeleteTextSection,
  DeleteTitle,
} from "./ConfirmDeleteModal.styled";

const ConfirmDeleteModal: FC<IConfirmDeleteModalProps> = ({
  fruitName,
  onConfirm,
  onCancel,
  isDeleting,
}) => {
  return (
    <DeleteOverlay onClick={onCancel}>
      <DeleteDialog onClick={(e) => e.stopPropagation()}>
        <DeleteTextSection>
          <DeleteTitle>Are you sure?</DeleteTitle>
          <DeleteBody>
            Delete &ldquo;{fruitName}&rdquo;? This action cannot be undone.
          </DeleteBody>
        </DeleteTextSection>

        <DeleteActions>
          <Button
            onClick={onCancel}
            $variant={{ variantName: "Outline" }}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            $variant={{ variantName: "Destructive" }}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DeleteActions>
      </DeleteDialog>
    </DeleteOverlay>
  );
};

export default ConfirmDeleteModal;
