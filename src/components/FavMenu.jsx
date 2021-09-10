import React, { useEffect, useRef, useState } from "react";
import UserData from "./UserData";
import { GrAddCircle } from "react-icons/gr";
import { BiUpvote } from "react-icons/bi";
import {
  collection,
  addDoc,
  serverTimestamp,
  getFirestore,
  onSnapshot,
  query,
  doc as fdoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";

import "./favMenu.css";
import app from "../firebaseApp";
import { getAuth } from "@firebase/auth";
const auth = getAuth(app);

function FavMenu() {
  const [sort, setSort] = useState("pop");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const textRef = useRef();
  const dbCollection = collection(getFirestore(app), "food");

  useEffect(() => {
    const q = query(dbCollection);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const foods = [];
      querySnapshot.forEach((doc) => {
        foods.push({
          _id: doc.id,
          ...doc.data(),
        });
      });
      setFoods([...foods]);
      console.log(foods);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const addFood = async () => {
    await addDoc(dbCollection, {
      food: textRef.current.value,
      // creator: "",
      creator: auth.currentUser.email,
      votes: [auth.currentUser.email],
      voteCount: 1,
      created: serverTimestamp(),
    });
    textRef.current.value = "";
    setSort("date");
  };

  return (
    <div>
      <UserData />
      <div className="content">
        <div className="addNew">
          <GrAddCircle size={30} />
          <input
            placeholder="메뉴이름"
            ref={textRef}
            type="text"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addFood();
              }
            }}
          />
          <button onClick={() => addFood()}>추가</button>
        </div>

        <div className="sortOpt">
          <button disabled={sort === "pop"} onClick={() => setSort("pop")}>
            인기순
          </button>
          <button disabled={sort === "date"} onClick={() => setSort("date")}>
            생성순
          </button>
        </div>

        {loading ? (
          <div>Loading Data...</div>
        ) : (
          <div className="list">
            {foods
              .sort((a, b) => {
                if (sort === "date") {
                  return (a.created?.toDate() || new Date()) <
                    (b.created?.toDate() || new Date())
                    ? 1
                    : -1;
                } else {
                  if (a.voteCount == b.vouteCount) {
                    return a.created.toDate() < b.created.toDate() ? 1 : -1;
                  }
                  return a.voteCount < b.voteCount ? 1 : -1;
                }
              })
              .map((doc) => (
                <div
                  className={[
                    "listitem",
                    doc.creator === auth.currentUser.email && "creator",
                  ].join(" ")}
                  key={doc._id}
                >
                  <div className="name">{doc.food}</div>
                  <div
                    className={[
                      "vote",
                      doc.votes.includes(auth.currentUser.email) && "already",
                    ].join(" ")}
                    onClick={() => {
                      if (doc.votes.includes(auth.currentUser.email)) {
                        // Cancel Vote
                        updateDoc(fdoc(dbCollection, doc._id), {
                          voteCount: increment(-1),
                          votes: arrayRemove(auth.currentUser.email),
                        });
                      } else {
                        updateDoc(fdoc(dbCollection, doc._id), {
                          voteCount: increment(1),
                          votes: arrayUnion(auth.currentUser.email),
                        });
                      }
                    }}
                  >
                    <BiUpvote />
                    <div>{doc.voteCount}</div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavMenu;
