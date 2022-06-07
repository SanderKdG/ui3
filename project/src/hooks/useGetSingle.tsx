import { useCallback, useEffect, useState } from "react"
import { defaultPlayer, Player } from "../domain/Player";
import { defaultFormation, Formation } from "../domain/Formation";
import { Club, defaultClub } from "../domain/Club";
import { getObject } from "../functions/objectService";

export default function useGetSingle<T>(url : string, defaultValue : T) {
  const [loading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [fetchedData, setFetchedData] = useState<T>(defaultValue)

  const getData = useCallback( async () => {
    try {
      const { data } = await getObject<T>(url)
      setFetchedData(data)
    } catch(error:any) {
      setError(true)
      console.log("useGetSingle has thrown an error: "+error)
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

export function useGetPlayer(url : string) {
  return useGetSingle<Player>(url, defaultPlayer())
}

export function useGetFormation(url : string) {
  return useGetSingle<Formation>(url, defaultFormation())
}

export function useGetClub(url : string) {
  return useGetSingle<Club>(url, defaultClub())
}