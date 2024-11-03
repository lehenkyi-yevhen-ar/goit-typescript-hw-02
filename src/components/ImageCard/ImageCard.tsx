import s from "./ImageCard.module.css"

interface Image {
  urls: {
    small: string
  }
  alt_description: string
  id: string | number
}
interface ImageCardProps {
  image: Image
  onClick: React.MouseEventHandler<HTMLDivElement>
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        key={image.id}
        style={{ cursor: "pointer" }}
        className={s.img}
      />
    </div>
  )
}

export default ImageCard
