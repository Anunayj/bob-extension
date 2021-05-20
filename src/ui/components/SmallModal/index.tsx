import React, {ReactElement} from "react";
import Modal, {ModalProps} from "@src/ui/components/Modal";
import "./samll-modal.scss";

export default function SmallModal(props: ModalProps): ReactElement {
  return (
    <Modal className="small-modal">
      { props.children }
    </Modal>
  )
}
