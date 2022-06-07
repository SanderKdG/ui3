export function isImage(url : string) {
  if(!url.includes("http")) return false
  if(url.includes(".png")) return true
  if(url.includes(".gif")) return true
  if(url.includes(".jpg")) return true
  if(url.includes(".jpeg")) return true
  return url.includes(".svg");

}