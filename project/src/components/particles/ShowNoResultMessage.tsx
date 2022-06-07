import SimpleAlert from "./SimpleAlert";

export function ShowNoResultMessage({filterLength = 0, listLength, lookingFor = "results", showImage = true} : {filterLength?:number, listLength:number, lookingFor?:string, showImage?: boolean}) {
  const imgSize = 100
  const img = `${window.location.origin}/img/noresults.png`
  let alert

  if(filterLength > 0 && listLength === 0) {
    alert = <SimpleAlert color={"info"}>{`We could not find any ${lookingFor.toLowerCase()} for this search.`}</SimpleAlert>
  } else if(listLength === 0) {
    alert = <SimpleAlert color={"warning"}>{`No ${lookingFor.toLowerCase()} have been found.`}</SimpleAlert>
  } else {
    return <></>
  }
  return (<>
    {alert}
    {!showImage ? "" : (<>
      <br/>
      <div style={{margin: "auto", height: imgSize, width: imgSize, backgroundSize: "cover", backgroundImage: `url("${img}")`}} />
    </>)}
  </>)
}