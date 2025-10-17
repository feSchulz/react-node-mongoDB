import "./Photo.css";
import { uploads } from "../../utils/config";

//components
import Message from "../../components/Message";
import { Link, useParams } from "react-router-dom";

//hooks
import { use, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//Redux
import { comment, getPhoto, like } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";
import { useResetComponentMessage } from "../../hooks/useResetComponentsMessage";

const Photo = () => {
  const { id } = useParams();
  console.log("ID : ", id);
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );
  const [commentText, setCommentText] = useState("");

  //comentários
  const handleComment = (e) => {
    e.preventDefault();
    const commentData = {
      comment: commentText,
      id: photo._id
    };
    dispatch(comment(commentData));
    setCommentText("");
    resetMessage();
  };

  //load photo data
  useEffect(() => {
    const data = dispatch(getPhoto(id));
    console.log("Data Dispatch", data);
  }, [dispatch, id]);

  /// like

  const handleLike = () => {
    dispatch(like(photo._id));
    resetMessage();
  };

  //comentario

  if (loading) {
    return <p>Carregando</p>;
  }
 

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
      <div className="comments">
        {photo.comments && (
          <>
            <h3>
              Comentários: (
              {photo.comments.length > 0 ? photo.comments.length : 0}){" "}
            </h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Insira seu comentário..."
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText || ""}
              />
              <input type="submit" value="Enviar" />
            </form>
            {photo.comments.length === 0 && <p>Não há comentários...</p>}
            {photo.comments.map((comment) => (
              <div className="comment" key={comment}>
                <div className="author">
                  {comment.userImage && (
                    <img
                      src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.userName}
                    />
                  )}
                  <Link to={`/users/${comment.userId}`}>
                    <p>{comment.userName}</p>
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
