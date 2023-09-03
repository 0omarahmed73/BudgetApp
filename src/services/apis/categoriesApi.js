import axiosAPI from "./axiosApi"

export const getCategories = async () => {
  const {data} = await axiosAPI.get('/categories');
  return data
}