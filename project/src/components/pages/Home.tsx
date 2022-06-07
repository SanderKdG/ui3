import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useHistory } from "react-router";
import { Formation } from "../../domain/Formation";
import useGetCollection from "../../hooks/useGetCollection";
import { PreviewFormationCard } from "../particles/FormationCard";

export default function Home() {
  return (<Container maxWidth="md">
    <Header />
    <BasicInfo />
    <FormationBrowser />
  </Container>)
}

function Header() {
  const [banner, setBanner] = useState(getRandomArena())
  const history = useHistory()

  const headerStyling = {
    mt: 3,
    color: "white",
    width: "100%",
    minHeight: 300,
    backgroundImage: `url("${banner}")`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: 2,
    filter: "drop-shadow(0 3px 7px #525A84)"
  }

  return (
    <Box sx={headerStyling} onClick={() => setBanner(getRandomArena())}>
      <Box sx={{m: "auto 10px", width: "fit-content", height: "fit-content", borderRadius: 2}}>
        <Typography variant="h2" sx={{p: 5, pt: 7, filter: "drop-shadow(0 0 5px #000)" }}>
          Belgian Leagues
        </Typography>
        <Button onClick={() => history.push("/formations/new")} variant="contained" color="primary" sx={{filter: "drop-shadow(0 0 10px #000)" , ml: 5}}>
          Create your team now!
        </Button>
      </Box>
    </Box>)
}

function BasicInfo() {
  return (<>
  <Grid container spacing={5} sx={{mt: 1, color: "default.main"}}>
    <Grid item md={6}>
      <Typography variant="h5">
        What is this?
      </Typography>
      <Typography variant="body1">
        This is a web application that allows you to create, modify and share formations of players from the Belgian soccer leagues (MAIN FEATURE). Each player in the system has an individual score based on his skills and how important this skill is for the position he plays in.
      </Typography>
    </Grid>
    <Grid item md={6}>
      <Typography variant="h5">
        About
      </Typography>
      <Typography variant="body1">
        This is a website made for User Interfaces 3, a subject at Karel de Grote College University for students who wish to graduate as a Full Stack developer in Applied Informatics.
      </Typography>
    </Grid>
  </Grid>
  </>)
}

function FormationBrowser() {
  const { loading, data, error } = useGetCollection<Formation>("/formations?_sort=likes&_order=desc&_limit=10")
  if(loading || error) return <></>

  return (<>
    <Typography variant="h5" sx={{mt: 4, color: "default.main"}}>
      Trending formations
    </Typography>
    <div className="flexCards centerCards">
      {
        data.map(f => (
          <PreviewFormationCard key={f.id} formation={f} />
        ))
      }
    </div>
  </>)
}

function getRandomArena():string {
  const arenas = [
    "https://www.essg.org/wp-content/uploads/2016/03/Ghelamco-Arena.jpg",
    "https://www.bontinck.biz/wp-content/uploads/2019/01/Bontinck-project-Ghelamco-Arena-141.jpg",
    "https://i.pinimg.com/originals/ec/ff/62/ecff62daf07e17511fba5c3e7f99d75b.jpg",
    "https://thumbs.werkaandemuur.nl/1/4393917120f278793e84d5b76bf9d05a/817x600/thumbnail/fit.jpg",
    "https://i.ytimg.com/vi/ibP6sWcyEK0/maxresdefault.jpg",
    "https://static.gva.be/Assets/Images_Upload/2020/03/12/f7b079d8-5276-11ea-a52b-2c60feb05c74_web_scale_0.0773395_0.0773395__.jpg",
    "https://images0.persgroep.net/rcs/T6Ny617PNeJIUZ1GmG6PFVjTdK0/diocontent/182189146/_fill/1200/630/?appId=21791a8992982cd8da851550a453bd7f&quality=0.7",
    "https://images.vrt.be/orig/2020/09/03/50e2604c-edc3-11ea-aae0-02b7b76bf47f.jpg",
    "https://madein-cdn-prod.s3.amazonaws.com/uploads/2021/05/stadion.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2c/HermanVanderpoortenstadion.JPG",
    "https://mapio.net/images-p/3464741.jpg",
    "https://www.sport.be/media/photos/2013/november/cristalarena.jpg",
    "https://images0.persgroep.net/rcs/IybICsdSL5pL-b3BMBGYQuC0F3U/diocontent/75318905/_fill/1600/793/?appId=21791a8992982cd8da851550a453bd7f&quality=0.9",
    "https://static.gva.be/Assets/Images_Upload/2021/09/30/6774b19d-4b8f-4ebb-bcd2-ef842f2d7adf.jpg",
    "https://img.gva.be/_DyICPN1SGzlci3NKRevQAvVQFI=/960x640/smart/https%3A%2F%2Fstatic.gva.be%2FAssets%2FImages_Upload%2F2018%2F03%2F04%2F9fc14582-1fe6-11e8-abed-970b02b708a3_original_retina.jpg",
    "https://static.gva.be/Assets/Images_Upload/2019/06/05/945d89be-878f-11e9-ab9e-84928619fcfd_web_scale_0.0730994_0.0730994__.jpg",
    "https://img.gva.be/WLMLM9duCnO42EgWz5XU1yXXdgQ=/960x640/smart/https%3A%2F%2Fstatic.gva.be%2FAssets%2FImages_Upload%2F2018%2F01%2F21%2F299aaa22-fecd-11e7-9d99-a552d56e19d9_web_scale_0.0875_0.0875__.jpg",
    "https://www.sport.be/media/photos/2019/juli/anderlecht1207.jpg",
    "https://www.kaagent.be/storage/rte_images/image/10466.jpg",
    "https://i.imgur.com/tKIN1Jj.jpg",
    "https://i.imgur.com/544DRCu.jpg",
    "https://i.imgur.com/67t5Rdf.jpg",
    "https://i.imgur.com/ctjTWML.jpg",
    "https://i.imgur.com/uIClDZE.jpg"
  ]

  return arenas[Math.floor(Math.random() * arenas.length)]
}