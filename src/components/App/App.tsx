import { useEffect, useState } from "react"
import SearchBar from "../SearchBar/SearchBar.js"
import { fetchImages } from "../../services/api.js"
import ImageGallery from "../ImageGallery/ImageGallery.js"
import Loader from "../Loader/Loader.js"
import ErrorMessage from "../ErrorMessage/ErrorMessage.js"
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.js"
import ImageModal from "../ImageModal/ImageModal.js"
import { Image } from "./App.js"
import React from "react"

const App = () => {
  const [images, setImages] = useState<Image[]>(
    []
  )
  const [isLoading, setIsLoading] =
    useState<boolean>(false)
  const [isError, setIsError] =
    useState<boolean>(false)
  const [query, setQuery] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [totalImages, setTotalImages] =
    useState<number>(0)
  const [hasSearched, setHasSearched] =
    useState<boolean>(false)
  const [modalIsOpen, setIsOpen] =
    useState<boolean>(false)
  const [selectedImage, setSelectedImage] =
    useState<Image | null>(null)

  useEffect(() => {
    if (!query) {
      return
    }
    const getData = async () => {
      try {
        setIsError(false)
        setIsLoading(true)
        const data = await fetchImages(
          query,
          page
        )
        console.log(data)

        setImages((prev) => [
          ...prev,
          ...data.results,
        ])
        setTotalImages(data.total)
      } catch (error) {
        setIsError(true)
        console.error(error)
      } finally {
        setIsLoading(false)
        setHasSearched(true)
      }
    }
    getData()
  }, [query, page])

  const handleSetQuery: React.Dispatch<
    React.SetStateAction<string>
  > = (searchValue) => {
    setQuery(searchValue)
    setImages([])
    setPage(1)
  }

  const openModal = (image: Image) => {
    document.body.style.overflow = "hidden"
    setSelectedImage(image)
    setIsOpen(true)
  }

  const closeModal = () => {
    document.body.style.overflow = "unset"
    setIsOpen(false)
    setSelectedImage(null)
  }

  return (
    <>
      <SearchBar setQuery={handleSetQuery} />
      <ImageGallery
        images={images}
        totalImages={totalImages}
        hasSearched={hasSearched}
        openModal={openModal}
      />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {images.length !== 0 && (
        <LoadMoreBtn setPage={setPage} />
      )}

      <ImageModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        image={selectedImage}
      />
    </>
  )
}

export default App
