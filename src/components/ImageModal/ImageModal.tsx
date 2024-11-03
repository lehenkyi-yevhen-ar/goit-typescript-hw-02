import Modal from "react-modal"
import s from "./ImageModal.module.css"

interface Image {
  urls: { full: string }
  id: string
  alt_description: string
}

interface ImageModalProps {
  image: Image | null,
  isOpen: boolean
  closeModal: () => void
}

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    width: "80%",
    height: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    pointerEvents: "none" as "none",
  },
}

Modal.setAppElement("#root")

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  closeModal,
  image,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="image modal"
      shouldCloseOnOverlayClick={true}
    >
      {image && (
        <img
          src={image.urls.full}
          alt={image.alt_description}
          className={s.img}
        />
      )}
    </Modal>
  )
}

export default ImageModal
