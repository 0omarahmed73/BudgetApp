import axiosAPI from "./axiosApi"

export const getTransactions = async () => {
  let {data} = await axiosAPI.get('/transactions')
  return data
}
export const deleteTransactions = async (id) => {
  let {data} = await axiosAPI.delete('/transactions/' + id)
  return data
}

export const updateTransactions = async (id , body) => {
  let {data} = await axiosAPI.put('/transactions/' + id , body)
  return data
}

export const postTransactions = async (body) => {
  let {data} = await axiosAPI.post('/transactions' , body)
  return data;
}