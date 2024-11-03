import s from "./LoadMoreBtn.module.css"

interface LoadMoreBtnProps {
  setPage: React.Dispatch<
    React.SetStateAction<number>
  >
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({
  setPage,
}) => {
  const handleNextPage = () => {
    setPage((prev) => prev + 1)
  }
  return (
    <div className={s.container}>
      <button
        onClick={handleNextPage}
        className={s.btn}
      >
        Load more
      </button>
    </div>
  )
}

export default LoadMoreBtn
