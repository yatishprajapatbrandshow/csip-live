import { API_URL } from "@/Config/Config";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserDetail from "@/Components/UserDetail";

const commentDataCon = [
  {
    id: "Testimonial 04",
    name: "Michael Ross",
    username: "@michjack",
    comment:
      "Simple lives up to its name in every way. It's incredibly easy to use yet powerful enough to handle all my tasks effortlessly. It's become an essential part of my daily routine.",
    date: "Jan 15, 2027",
  },
  {
    id: "Testimonial 01",
    name: "Peter Lowe",
    username: "@peterlowex",
    comment:
      "As a founder, having a visually appealing and user-friendly website is essential. This tool not only helped me achieve that but also improved my site's performance and SEO.",
    date: "May 19, 2027",
  },
  {
    id: "Testimonial 02",
    name: "Rodri Alba",
    username: "@rodri_spn",
    comment:
      "Simple has revolutionized the way I manage my work. Its intuitive interface and seamless functionality make staying organized effortless. I can't imagine my life without it.Simple has revolutionized the way I manage my work. Its intuitive interface and seamless functionality make staying organized effortless. I can't imagine my life without it. Simple has revolutionized the way I manage my work. Its intuitive interface and seamless functionality make staying organized effortless. I can't imagine my life without it.Simple has revolutionized the way I manage my work. Its intuitive interface and seamless functionality make staying organized effortless. I can't imagine my life without it.",
    date: "Apr 12, 2027",
  },
  {
    id: "Testimonial 03",
    name: "Michele Lex",
    username: "@MikyBrown",
    comment:
      "I've tried several website builders before, but none were as user-friendly and versatile as this one. From design to functionality, it exceeded my expectations!",
    date: "Mar 04, 2027",
  },
  {
    id: "Testimonial 04",
    name: "Michael Ross",
    username: "@michjack",
    comment:
      "Simple lives up to its name in every way. It's incredibly easy to use yet powerful enough to handle all my tasks effortlessly. It's become an essential part of my daily routine.",
    date: "Jan 15, 2027",
  },
  {
    id: "Testimonial 01",
    name: "Peter Lowe",
    username: "@peterlowex",
    comment:
      "As a founder, having a visually appealing and user-friendly website is essential. This tool not only helped me achieve that but also improved my site's performance and SEO. As a founder, having a visually appealing and user-friendly website is essential. This tool not only helped me achieve that but also improved my site's performance and SEO. As a founder, having a visually appealing and user-friendly website is essential. This tool not only helped me achieve that but also improved my site's performance and SEO.",
    date: "May 19, 2027",
  },
  {
    id: "Testimonial 02",
    name: "Rodri Alba",
    username: "@rodri_spn",
    comment:
      "Simple has revolutionized the way I manage my work. Its intuitive interface and seamless functionality make staying organized effortless. I can't imagine my life without it. ",
    date: "Apr 12, 2027",
  },
  {
    id: "Testimonial 03",
    name: "Michele Lex",
    username: "@MikyBrown",
    comment:
      "I've tried several website builders before, but none were as user-friendly and versatile as this one. From design to functionality, it exceeded my expectations!",
    date: "Mar 04, 2027",
  },
];

const EmployeeProfile = ({ itemID }) => {
  const [CommentDatatoPost, setCommentDatatoPost] = useState("");
  const [CommentData, setCommentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.session.userData);

  const AddStudentCommects = async () => {
    const Payload = {
      participant_id: userData.sid,
      comment: CommentData,
      parentId: 0,
      pageUrl: "Demo",
      activity_id: itemID,
      type: "student",
    };
    const APIURL = `${API_URL}student-comments/add`;

    try {
      const response = await fetch(APIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Payload),
      });
      const data = await response.json();
      if (data.status === true) {
        FetchStudentCommects();
      }
    } catch (error) {}
  };

  const FetchStudentCommects = async () => {
    const APIURL = `${API_URL}student-comments/get?activity_id=${itemID}`;
    try {
      const response = await fetch(APIURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.status === true) {
        setCommentDatatoPost(data.data);
      } else {
        setCommentDatatoPost(false);
      }
    } catch (error) {
      setCommentDatatoPost(false);
    }
  };

  useEffect(() => {
    FetchStudentCommects();
  }, []);

  const formatCommentTime = (commentTime) => {
    const timeDifference = Date.now() - new Date(commentTime).getTime();
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} min ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 10) {
      return `${days} days ago`;
    } else {
      return new Date(commentTime).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }); // e.g., "10 Oct 2024"
    }
  };

  return (
    <>
      <form class="mb-6">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label for="comment" class="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="6"
            value={CommentData}
            onChange={(e) => setCommentData(e.target.value)}
            class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            required
          ></textarea>
        </div>
        <button
          type="button"
          onClick={() => AddStudentCommects()}
          class="w-52 h-10 flex justify-center items-center bg-white border border-blue-500 text-blue-500 rounded-md"
        >
          Post comment
        </button>
      </form>
      <div className="grid grid-cols-3 gap-2">
        <div
          className={`bg-blue-500 border border-rose-100 rounded-lg p-6 row-span-2`}
        >
          <h3 className="text-3xl mb-4 font-bold capitalize text-white">
            Student Feedback Highlights
          </h3>
          <p className="text-white text-sm mb-4">
            See what our students have to say about their experience with our
            platform. Their success stories reflect the power of intuitive
            design and seamless functionality.
          </p>
          <img className="block -mb-10" src="/images/student_review.png" />
        </div>
        {CommentDatatoPost ? (
          <>
            {CommentDatatoPost.sort(
              (a, b) => new Date(b.commentTime) - new Date(a.commentTime)
            )
              .map((testimonial, index) => (
                <div
                  key={index}
                  className={`bg-gray-50 border border-gray-200 rounded-lg p-6 ${
                    testimonial.comment.length >= 200 ? "row-span-2" : ""
                  }`}
                >  
                    <UserDetail participant_id={testimonial.participant_id} />
                    <p className="text-sm text-gray-500 mb-4"> {testimonial.username} </p>
                    <p className="text-gray-700 text-sm text-justify mb-4"> {testimonial.comment} </p>
                    <p className="text-sm text-gray-400">{formatCommentTime(testimonial.commentTime)}</p>
                </div>
              ))}
          </>
        ) : null}
      </div>
    </>
  );
};

export default EmployeeProfile;