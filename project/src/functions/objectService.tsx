import http from "axios";

http.defaults.baseURL = "http://localhost:3001";

export async function getObject<T>(url : string) {
  return await http.get<T>(url)
}

export async function postObject<T>(url: string, object : T) {
  try {
    await http.post<T>(url, object)
    return true
  } catch (exception : any) {
    console.log(exception)
    return false
  }
}

export async function putObject<T>(url: string, object : T) {
  try {
    await http.put<T>(url, object)
    return true
  } catch (exception : any) {
    console.log(exception)
    return false
  }
}

export async function deleteObject(url: string) {
  try {
    await http.delete(url)
    return true
  } catch (exception : any) {
    console.log(exception)
    return false
  }
}