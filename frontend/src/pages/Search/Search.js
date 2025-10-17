import "./Search.css";

//hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentsMessage";
import { useQuery } from "../../hooks/useQuery";

//componnets
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import { Link } from "react-router-dom";

//redux
import { searchPhotos, like } from "../../slices/photoSlice";

const Search = () => {
  const query = useQuery();
  let search = query.get("q");
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);
  console.log("photos",photos);
  const handleLike = (photo) => {
    console.log("Like enviado para:", photo._id);
    dispatch(like(photo._id));
    search = query.get("q");
    resetMessage();
  };

  useEffect(() => {
    console.log("Atualizei o componente");
    dispatch(searchPhotos(search));
  }, [search, dispatch]);

  //like a photo

  if (loading) {
    return <p>Carregando</p>;
  }

  return (
    <div id="search">
      <h2>Você esta buscando por: {search}</h2>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Não foram Encontrados resultados pra sua busca...
        </h2>
      )}
    </div>
  );
};

export default Search;
