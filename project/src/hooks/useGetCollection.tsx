import { useCallback, useEffect, useState } from "react"
import { getObject } from "../functions/objectService";

export default function useGetCollection<T>(url : string) {
  const [loading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [fetchedData, setFetchedData] = useState<Array<T>>([])

  const getData = useCallback( async () => {
    try {
      const { data } = await getObject<Array<T>>(url)
      setFetchedData(data)
    } catch(error:any) {
      setError(true)
      console.log("useGetCollection has thrown an error: "+error)
    } finally {
      setIsLoading(false)
    }
  }, [url])

  useEffect(() => {
    getData()
  }, [getData, url]);

  async function refetch() {
    setIsLoading(true)
    await getData()
    return { loading, "data": fetchedData, refetch, error }
  }
  return { loading, "data": fetchedData, refetch, error }
}