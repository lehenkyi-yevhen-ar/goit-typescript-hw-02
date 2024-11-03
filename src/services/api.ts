import axios from "axios"

const API_KEY =
  "s1KS5ciEEdTZ_RgvzUReLbHbpy8R_SLXNIP0zKKH4y8"

interface Image {
  id: string
  urls: {
    small: string
    full: string
  }
  alt_description: string
}

interface FetchImagesResponse {
  results: Image[]
  total: number
  total_pages: number
}

export const fetchImages = async (
  query: string,
  page: number = 1
): Promise<FetchImagesResponse> => {
  try {
    const response =
      await axios.get<FetchImagesResponse>(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: query,
            client_id: API_KEY,
            page: page,
            per_page: 16,
          },
        }
      )

    return response.data
  } catch (error) {
    console.error("Error fetching images:", error)
    throw error
  }
}
