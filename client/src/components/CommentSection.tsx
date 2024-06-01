import React, { useEffect, useRef, useState } from 'react';
import Wrapper from '../assets/wrappers/CommentSection';
import CommentInput from './CommentInput';
import Comment from './Comment';
import { useSearchParams } from 'react-router-dom';
import { getAuthClient } from '../api/client';
import { AxiosError } from 'axios';
import { message } from 'antd';
import Loading from './Loading';
import { GoTriangleDown } from 'react-icons/go';
import PrimaryButton from './PrimaryButton';

interface CommentSectionProps {}

export interface IReply {
  _id: string;
  user: { _id: string; name: string; avtPath: string };
  episode: string;
  content: string;
  upvote: number;
  devote: number;
  userAction: -1 | 0 | 1;
  createdAt: string;
  parentComment: string;
}

export interface IComment {
  _id: string;
  user: { _id: string; name: string; avtPath: string };
  episode: string;
  content: string;
  upvote: number;
  devote: number;
  userAction: -1 | 0 | 1;
  createdAt: string;
  replyCount: number;
  replies: IReply[];
}

const CommentSection: React.FC<CommentSectionProps> = () => {
  const [firstLoad, setFirstload] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const [params] = useSearchParams();
  const episode = params.get('episode');

  const targetRef = useRef(null);

  const addCommentVote = (_id: string, userAction: -1 | 0 | 1) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment._id === _id) {
          let upvote = comment.upvote;
          let devote = comment.devote;

          switch (userAction - comment.userAction) {
            case 1:
              upvote++;
              break;
            case -1:
              devote++;
              break;
            case 2:
              upvote++;
              devote--;
              break;
            case -2:
              upvote--;
              devote++;
              break;
            case 0:
              if (userAction === 1) {
                upvote--;
              } else if (userAction === -1) {
                devote--;
              }
              userAction = 0;
              break;
          }
          return { ...comment, upvote, devote, userAction };
        } else {
          return comment;
        }
      })
    );
  };

  const addReplyVote = (
    commentId: string,
    replyId: string,
    userAction: -1 | 0 | 1
  ) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment._id === commentId) {
          const replies = comment.replies.map((reply) => {
            if (reply._id === replyId) {
              let upvote = reply.upvote;
              let devote = reply.devote;

              switch (userAction - reply.userAction) {
                case 1:
                  upvote++;
                  break;
                case -1:
                  devote++;
                  break;
                case 2:
                  upvote++;
                  devote--;
                  break;
                case -2:
                  upvote--;
                  devote++;
                  break;
                case 0:
                  if (userAction === 1) {
                    upvote--;
                  } else if (userAction === -1) {
                    devote--;
                  }
                  userAction = 0;
                  break;
              }

              return { ...reply, upvote, devote, userAction };
            } else {
              return reply;
            }
          });
          return { ...comment, replies };
        } else {
          return comment;
        }
      })
    );
  };

  const addComment = (comment: IComment) => {
    comment.replies = [];
    setComments((prevComments) => [comment, ...prevComments]);
  };

  const addComments = (newComments: IComment[]) => {
    setComments((prevComments) => [
      ...newComments.map((comment) => {
        comment.replies = [];
        return comment;
      }),
      ...prevComments,
    ]);
  };

  const addReply = (reply: IReply) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment._id !== reply.parentComment) return comment;

        console.log(comment);

        if (comment.replies.length === comment.replyCount)
          return {
            ...comment,
            replies: [...comment.replies, reply],
            replyCount: comment.replyCount + 1,
          };

        return {
          ...comment,
          replyCount: comment.replyCount + 1,
        };
      })
    );
  };

  const addReplies = (replies: IReply[]) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === replies[0].parentComment
          ? {
              ...comment,
              replies: [...comment.replies, ...replies],
            }
          : comment
      )
    );
  };

  const getComments = async () => {
    setLoading(true);
    try {
      const createdAt =
        comments.length !== 0
          ? comments[comments.length - 1].createdAt
          : new Date().toISOString();
      const response = await getAuthClient().get(
        `/comments?episode=${episode}&createdAt=${createdAt}&limit=12`
      );
      const { comments: cs, hasMore } = response.data;
      addComments(cs);
      setHasMore(hasMore);
    } catch (err) {
      const error = err as AxiosError;
      message.error((error.response?.data as any).msg);
    }
    setLoading(false);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting && episode) {
        await getComments();
        setFirstload(true);
        if (targetRef.current) observer.unobserve(targetRef.current);
      }
    }, options);

    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper ref={targetRef}>
      <header>
        <p>comment</p>
      </header>
      {firstLoad ? (
        <>
          <CommentInput addComment={addComment} episode={episode} />
          <div className='comment-container'>
            {comments.map((comment) => {
              return (
                <Comment
                  addReplies={addReplies}
                  addReply={addReply}
                  comment={comment}
                  key={comment._id}
                  addCommentVote={addCommentVote}
                  addReplyVote={addReplyVote}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div style={{ height: '300px' }}>
          <Loading style={{ display: 'block', width: '300px' }} />
        </div>
      )}
      {hasMore && !loading && (
        <PrimaryButton
          startIcon={GoTriangleDown}
          className='show-more'
          onClick={getComments}
          disabled={loading}
        >
          View more
        </PrimaryButton>
      )}
      {loading && hasMore && (
        <Loading style={{ display: 'block', width: '300px' }} />
      )}
    </Wrapper>
  );
};

export default CommentSection;
