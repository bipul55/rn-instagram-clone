import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { db } from "../../firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";

export default function Posts({ p, id, currentUserEmail }) {
  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState(p);

  useEffect(() => {
    if (post.likes.includes(currentUserEmail)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post]);
  const handleLike = async () => {
    console.log("clicked");
    const documentReference = doc(db, "posts", id);
    if (liked) {
      await updateDoc(documentReference, {
        likes: arrayRemove(currentUserEmail),
      })
        .then((data) => {
          const index = post.likes.indexOf(currentUserEmail);
          var temp = post;
          temp.likes.splice(index, 1);
          setPost({ ...temp });
          setLiked(false);
        })
        .catch((err) => console.log(err));
    } else {
      updateDoc(documentReference, {
        likes: arrayUnion(currentUserEmail),
      })
        .then((data) => {
          var temp = post;
          console.log("temp", temp);
          temp.likes.push(currentUserEmail);
          setPost({ ...temp });
          setLiked(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <View style={style.container}>
      <View
        style={{
          borderTopColor: "#999999",
          borderWidth: 0.5,
        }}
      ></View>
      <PostHeader profilePic={post.profilePic} userName={post.userName} />
      <PostImage imageUrl={post.imageUrl} />
      <PostFooter
        likes={post.likes}
        caption={post.caption}
        comments={post.comments}
        userName={post.userName}
        handleLike={handleLike}
        liked={liked}
      />
    </View>
  );
}

const PostHeader = ({ profilePic, userName }) => {
  return (
    <View style={style.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={style.profilePic}
          source={{
            uri: profilePic,
          }}
        />
        <Text style={{ color: "white", fontSize: 15 }}>{userName}</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
      </View>
    </View>
  );
};
const PostImage = ({ imageUrl }) => {
  return (
    <View
      style={{
        width: "100%",
        height: 450,
      }}
    >
      <Image
        style={style.image}
        source={{
          uri: imageUrl,
        }}
      />
    </View>
  );
};
const PostFooter = ({
  likes,
  caption,
  comments,
  userName,
  handleLike,
  liked,
}) => {
  return (
    <View style={style.footer}>
      <View style={style.footerIconContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={handleLike}>
            <Image
              style={style.icon}
              source={{
                uri: liked
                  ? "https://img.icons8.com/fluency/48/000000/like.png"
                  : "https://img.icons8.com/windows/32/ffffff/like.png",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={style.icon}
              source={{
                uri: "https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/ffffff/external-comment-chat-flatart-icons-outline-flatarticons-2.png",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={style.icon}
              source={{
                uri: "https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/ffffff/external-send-instagram-flatart-icons-outline-flatarticons.png",
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Image
              style={style.icon}
              source={{
                uri: "https://img.icons8.com/material-outlined/24/ffffff/bookmark-ribbon--v1.png",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.likeContainer}>
        <Text style={{ color: "white", fontWeight: "900" }}>
          {likes.length} Likes
        </Text>
      </View>
      <View style={style.captionContainer}>
        {caption.length > 0 && (
          <Text style={{ color: "white" }}>
            <Text style={{ fontWeight: "700" }}>{userName} </Text>
            <Text>{caption}</Text>
          </Text>
        )}
      </View>
      {comments && (
        <View style={style.commentContainer}>
          <Text style={{ color: "gray" }}>
            {comments.length > 0
              ? comments.length > 1
                ? `View All ${comments.length} Comments`
                : "View 1 Comment"
              : "Comment"}
          </Text>
          {comments.map((comment, index) => {
            return (
              <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ color: "white" }}>
                  <Text style={{ fontWeight: "700" }}>
                    {comment.user}
                    {"  "}
                  </Text>
                  <Text>{comment.comment}</Text>
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    // marginTop: 5,
  },
  profilePic: {
    height: 30,
    width: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ff8501",
    marginRight: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    marginTop: 10,
  },
  footer: {
    marginTop: 5,
    padding: 10,
  },

  footerIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 10,
    marginTop: 10,
  },
  likeContainer: {
    marginTop: 5,
  },
  captionContainer: {
    marginTop: 10,
  },
  commentContainer: {},
});
